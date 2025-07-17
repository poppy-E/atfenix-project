import React from "react";
import { Badge } from "@/app/ui/Badge";

export default function ModernServerCard({ server, formatDate, renderStatus }) {
  const { label, color } = renderStatus(server.status);

  const badgeStyles = {
    green: "bg-green-500/20 text-green-400 border-green-500/30",
    red: "bg-red-500/20 text-red-400 border-red-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    gray: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
      {/* <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-violet-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-violet-700/50"> */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">{server.name}</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Monitored server for uptime and availability.
          </p>
        </div>
        <Badge
          className={`${
            badgeStyles[color] || badgeStyles.gray
          } px-4 py-2 text-sm font-medium rounded-full hover:opacity-80 transition-colors whitespace-nowrap flex items-center gap-1`}
        >
          {label}
        </Badge>
      </div>

      <div className="bg-gray-700/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
        {/* <div className="bg-[rgba(31,41,55,0.4)] rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30"> */}
        <h2 className="text-gray-400 text-sm font-medium mb-6 tracking-wide">
          Server Uptime
        </h2>

        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-white tracking-tight">
            {server.uptime_percentage === null
              ? "N/A"
              : `${server.uptime_percentage}%`}
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-white font-medium text-sm">Last Checked</span>
            <span className="text-gray-300 text-sm">
              {formatDate(server.last_checked)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
