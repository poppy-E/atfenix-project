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
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 sm:p-8 shadow-2xl border border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
            {server.name}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Monitored server for uptime and availability.
          </p>
        </div>
        <Badge
          className={`${
            badgeStyles[color] || badgeStyles.gray
          } px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full hover:opacity-80 transition-colors whitespace-nowrap flex items-center gap-1 self-start`}
        >
          {label}
        </Badge>
      </div>

      <div className="bg-gray-700/50 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/30">
        <h2 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 tracking-wide">
          Server Uptime
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {server.uptime_percentage === null
              ? "N/A"
              : `${server.uptime_percentage}%`}
          </div>

          <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
            <span className="text-white font-medium text-xs sm:text-sm">
              Last Checked
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">
              {formatDate(server.last_checked)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
