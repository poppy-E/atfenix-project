"use client";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import UptimeChart from "@/app/components/UptimeChart";
import ServerCard from "@/app/components/ServerCard";
import Footer from "../components/Footer";
// import ServerstatusCard from "@/app/components/ServerstatusCard";

export default function DashboardPage() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers();

    let timeoutId;

    const channel = supabase
      .channel("servers-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "servers",
        },
        () => {
          // Debounce fetchServers to avoid flicker
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            fetchServers();
          }, 500);
        }
      )
      .subscribe();

    return () => {
      clearTimeout(timeoutId);
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchServers() {
    const { data: serversData, error: serversError } = await supabase
      .from("servers")
      .select("*");

    if (serversError) {
      console.error("Error fetching data:", serversError);
      return;
    }

    const sorted = serversData.sort((a, b) => a.name.localeCompare(b.name));

    setServers(sorted);
  }

  function formatDate(datetime) {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  }

  function renderStatus(status) {
    const normalized = status?.toLowerCase();
    const map = {
      online: { label: "🟢 Online", color: "green" },
      up: { label: "🟢 Online", color: "green" },
      offline: { label: "🔴 Offline", color: "red" },
      down: { label: "🔴 Offline", color: "red" },
      unknown: { label: "🟡 Unknown", color: "yellow" },
    };
    return map[normalized] || { label: "⚪ No Status", color: "gray" };
  }

  return (
    <>
      <Header />
      <main className="p-6 bg-[#FAF9F6] min-h-screen font-poppins py-14 px-10">
        <h1
          className=" flex justify-center text-3xl font-bold mb-12 mt-24 "
          style={{ color: "#000000" }}
        >
          Server Monitoring Dashboard
        </h1>

        {servers.length === 0 ? (
          <p className="text-gray-500">No servers found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-5 lg:grid-cols-3">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
              {servers.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  formatDate={formatDate}
                  renderStatus={renderStatus}
                />
              ))}
            </div>
            {/* <div className="flex items-center justify-center"> */}
            <div className="col-span-1 flex items-center justify-center mt-4 lg:mt-0">
              <UptimeChart
                data={servers.map((server) => ({
                  name: server.name,
                  uptime_percentage: server.uptime_percentage ?? 0,
                }))}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
