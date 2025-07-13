import cron from "node-cron";
import { checkServers } from "./ping-script.js";
import dotenv from "dotenv";

dotenv.config();

setInterval(async () => {
  console.log("⏱️ Pinging servers at", new Date().toLocaleString());
  await checkServers();
}, 20 * 1000);

console.log("✅ Ping loop started. Will ping every 20 seconds.");

// cron.schedule("0 0 * * *", async () => {
//   console.log("⏱️ Pinging servers at", new Date().toLocaleString());
//   await checkServers();
// });

// console.log("✅ Cron job started. Will ping every 24 hours at midnight.");

// Run every 2 minutes
// cron.schedule("*/2 * * * *", async () => {
//   console.log("⏱️ Pinging servers at", new Date().toLocaleString());
//   await checkServers();
// });

// console.log("✅ Cron job started. Will ping every 2 minutes.");
