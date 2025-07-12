export default function ServerCard({ server, formatDate, renderStatus }) {
  return (
    <div className="bg-grey-100 p-4 shadow rounded-xl transition hover:shadow-md">
      <h2 className="text-xl font-semibold mb-2">{server.name}</h2>
      <p>Status: {renderStatus(server.status)}</p>
      <p className="text-sm text-gray-600">
        Last Checked: {formatDate(server.last_checked)}
      </p>
      <p className="text-sm text-gray-600">
        Uptime:{" "}
        {server.uptime_percentage === null ? (
          "N/A"
        ) : (
          <span className="text-green-500 font-semibold text-xl">
            {server.uptime_percentage}%
          </span>
        )}
      </p>
    </div>
  );
}
