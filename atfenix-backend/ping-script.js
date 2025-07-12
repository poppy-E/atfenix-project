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

      const status = result.alive ? "online" : "offline";
      const responseTime = result.alive ? parseFloat(result.time) : null;
      const now = new Date().toISOString();

      const { error: logError } = await supabase.from("ping_logs").insert({
        server_id: server.id,
        status,
        response_time: responseTime,
        pinged_at: now,
      });

      if (logError) {
        console.error(
          `Failed to log ping for ${server.name}:`,
          logError.message
        );
      }

      const { error: updateError } = await supabase
        .from("servers")
        .update({
          status,
          last_checked: now,
        })
        .eq("id", server.id);

      if (updateError) {
        console.error(
          `Failed to update server status for ${server.name}:`,
          updateError.message
        );
      } else {
        console.log(`✅ ${server.name} (${server.ip_address}) is ${status}`);
      }
    } catch (err) {
      console.error(`Error pinging ${server.name}:`, err.message);
    }
  }
}
