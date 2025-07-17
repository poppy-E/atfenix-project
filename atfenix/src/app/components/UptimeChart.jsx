"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UptimeChart({ data }) {
  if (!data || data.length === 0) return null;

  const processedData = data.map((d) => ({
    name: d.name || "Unnamed",
    uptime_percentage: d.uptime_percentage ?? 0,
  }));

  return (
    <div className="w-md h-100 bg-white-400 p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4" style={{ color: "#000000" }}>
        Server Uptime (%)
      </h2>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-15}
            textAnchor="end"
            tick={{ fontSize: 10 }}
          />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="uptime_percentage" fill="#495057" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
