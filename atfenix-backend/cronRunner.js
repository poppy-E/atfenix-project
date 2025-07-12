import cron from "node-cron";
import { checkServers } from "./ping-script.js";
import dotenv from "dotenv";

dotenv.config();

cron.schedule("0 0 * * *", async () => {
  console.log("⏱️ Pinging servers at", new Date().toLocaleString());
  await checkServers();
});

console.log("✅ Cron job started. Will ping every 24 hours at midnight.");
