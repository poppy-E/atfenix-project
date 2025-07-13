"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import UptimeChart from "@/app/components/UptimeChart";
import ServerCard from "@/app/components/ServerCard";

export default function DashboardPage() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers();

    const channel = supabase
      .channel("servers-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "servers",
        },
        () => fetchServers()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchServers() {
    const { data: serversData, error: serversError } = await supabase
      .from("servers")
      .select("*");

    const { data: uptimeData, error: uptimeError } = await supabase
      .from("server_uptime")
      .select("*");

    if (serversError || uptimeError) {
      console.error("Error fetching data:", serversError || uptimeError);
      return;
    }

    const merged = serversData.map((server) => {
      const uptime = uptimeData.find((u) => u.server_id === server.id);
      return {
        ...server,
        uptime_percentage: uptime?.uptime_percentage ?? null,
      };
    });

    setServers(merged);
  }

  function formatDate(datetime) {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  }

  function renderStatus(status) {
    const normalized = status?.toLowerCase();
    const map = {
      online: { label: "🟢 Online", color: "text-green-600" },
      offline: { label: "🔴 Offline", color: "text-red-600" },
      up: { label: "🟢 Online", color: "text-green-600" },
      down: { label: "🔴 Offline", color: "text-red-600" },
      unknown: { label: "🟡 Unknown", color: "text-yellow-600" },
    };
    const { label, color } = map[normalized] || {
      label: "⚪ No Status",
      color: "text-gray-600",
    };

    return <span className={`font-medium ${color}`}>{label}</span>;
  }

  return (
    <main className="p-6 bg-[#FAF9F6] min-h-screen font-poppins">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#1864ab" }}>
        Server Monitoring Dashboard
      </h1>

      {servers.length === 0 ? (
        <p className="text-gray-500">No servers found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            {servers.map((server) => (
              <ServerCard
                key={server.id}
                server={server}
                formatDate={formatDate}
                renderStatus={renderStatus}
              />
            ))}
          </div>
          <UptimeChart
            data={servers.map((server) => ({
              name: server.name,
              uptime_percentage: server.uptime_percentage || 0,
            }))}
          />
        </div>
      )}
    </main>
  );
}
