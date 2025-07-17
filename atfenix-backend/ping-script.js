import { createClient } from "@supabase/supabase-js";
import ping from "ping";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function checkServers() {
  const { data: servers, error } = await supabase
    .from("servers")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("❌ Error fetching servers:", error.message);
    return;
  }

  const now = new Date().toISOString();

  const results = await Promise.all(
    servers.map(async (server) => {
      try {
        const result = await ping.promise.probe(server.ip_address, {
          timeout: 5,
          extra: ["-c", "1"],
        });

        const isAlive = result?.alive ?? false;
        const responseTime =
          isAlive && result.time ? parseFloat(result.time) : null;
        const status = isAlive ? "up" : "down";

        // Insert ping log
        const { error: logError } = await supabase.from("ping_logs").insert({
          server_id: server.id,
          status,
          response_time: responseTime,
          pinged_at: now,
          source: "default",
        });

        if (logError) {
          console.error(
            `❌ Failed to log ping for ${server.name}:`,
            logError.message
          );
        }

        // Fetch counters
        const { data: currentData, error: fetchError } = await supabase
          .from("servers")
          .select("total_pings, successful_pings")
          .eq("id", server.id)
          .single();

        if (fetchError) {
          console.error(
            `❌ Failed to fetch counters for ${server.name}:`,
            fetchError.message
          );
          return null;
        }

        let total_pings = currentData?.total_pings || 0;
        let successful_pings = currentData?.successful_pings || 0;

        total_pings++;
        if (status === "up") successful_pings++;

        const uptime_percentage = parseFloat(
          ((successful_pings / total_pings) * 100).toFixed(2)
        );

        return {
          id: server.id,
          name: server.name,
          status,
          last_checked: now,
          total_pings,
          successful_pings,
          uptime_percentage,
        };
      } catch (err) {
        console.error(`❌ Error pinging ${server.name}:`, err.message);

        await supabase.from("ping_logs").insert({
          server_id: server.id,
          status: "error",
          response_time: null,
          pinged_at: now,
          source: "default",
        });

        return null;
      }
    })
  );

  // Filter out failed pings
  const updates = results.filter((r) => r !== null);

  // Batch update all servers in parallel
  await Promise.all(
    updates.map(async (server) => {
      const { error: updateError } = await supabase
        .from("servers")
        .update({
          status: server.status,
          last_checked: server.last_checked,
          total_pings: server.total_pings,
          successful_pings: server.successful_pings,
          uptime_percentage: server.uptime_percentage,
        })
        .eq("id", server.id);

      if (updateError) {
        console.error(
          `❌ Failed to update ${server.name}:`,
          updateError.message
        );
      } else {
        console.log(
          `✅ ${server.name} is ${server.status} | Uptime: ${server.uptime_percentage}%`
        );
      }
    })
  );
}
