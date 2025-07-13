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
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching servers:", error.message);
    return;
  }

  for (const server of servers) {
    try {
      const result = await ping.promise.probe(server.ip_address, {
        timeout: 5,
        extra: ["-c", "1"],
      });

      let status;
      if (typeof result.alive === "boolean") {
        status = result.alive ? "up" : "down";
      } else {
        status = "unknown";
      }

      const responseTime = result.alive ? parseFloat(result.time) : null;
      const now = new Date().toISOString();

      // Log ping result
      const { error: logError } = await supabase.from("ping_logs").insert({
        server_id: server.id,
        status,
        response_time: responseTime,
        pinged_at: now,
        source: "default",
      });

      if (logError) {
        console.error(
          `Failed to log ping for ${server.name}:`,
          logError.message
        );
      }

      // Fetch current counts
      const { data: currentData, error: fetchError } = await supabase
        .from("servers")
        .select("total_pings, successful_pings")
        .eq("id", server.id)
        .single();

      if (fetchError) {
        console.error(
          `Failed to fetch ping counters for ${server.name}:`,
          fetchError.message
        );
        continue;
      }

      let total_pings = currentData.total_pings || 0;
      let successful_pings = currentData.successful_pings || 0;

      total_pings++;
      if (status === "up") {
        successful_pings++;
      }

      const uptime_percentage = parseFloat(
        ((successful_pings / total_pings) * 100).toFixed(2)
      );

      // Update server status
      const { error: updateError } = await supabase
        .from("servers")
        .update({
          status,
          last_checked: now,
          total_pings,
          successful_pings,
          uptime_percentage,
        })
        .eq("id", server.id);

      if (updateError) {
        console.error(
          `Failed to update server status for ${server.name}:`,
          updateError.message
        );
      } else {
        console.log(
          `✅ ${server.name} (${server.ip_address}) is ${status} | Uptime: ${uptime_percentage}%`
        );
      }
    } catch (err) {
      console.error(`Error pinging ${server.name}:`, err.message);

      await supabase.from("ping_logs").insert({
        server_id: server.id,
        status: "error",
        response_time: null,
        pinged_at: new Date().toISOString(),
        source: "default",
      });
    }
  }
}
