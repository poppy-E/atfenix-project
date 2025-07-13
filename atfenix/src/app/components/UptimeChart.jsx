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

  return (
    <div className=" w-md h-100 bg-white p-4 rounded-xl shadow mt-6 pb-10 ">
      <h2 className="text-xl font-bold mb-4" style={{ color: "#1864ab" }}>
        Server Uptime (%)
      </h2>
      <ResponsiveContainer width="75%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="uptime_percentage" fill="#1864ab" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
