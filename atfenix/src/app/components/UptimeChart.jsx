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
      <h2 className="text-xl font-bold mb-4">Server Uptime (%)</h2>
      <ResponsiveContainer width="75%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="uptime_percentage" fill="#ff922b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
