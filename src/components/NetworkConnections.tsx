/** YOUR NETWORK CONNECTIONS: name, 2-line summary, LinkedIn link. */

interface MutualConnection {
  name: string;
  summary: string;
  linkedInUrl: string;
}

interface NetworkConnectionsProps {
  personId: string;
  mutualConnections: Record<string, MutualConnection[]>;
  className?: string;
}

export function NetworkConnections({
  personId,
  mutualConnections,
  className = "",
}: NetworkConnectionsProps) {
  const connections = mutualConnections[personId] ?? [];

  if (connections.length === 0) {
    return (
      <section className={className}>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">YOUR NETWORK CONNECTIONS</h3>
        <p className="text-sm text-gray-500">
          Edit <code className="bg-gray-800 px-1 rounded">mutualConnections</code> in <code className="bg-gray-800 px-1 rounded">src/data/org-data.ts</code> to add connections.
        </p>
      </section>
    );
  }

  return (
    <section className={className}>
      <h3 className="text-sm font-semibold text-gray-300 mb-3">YOUR NETWORK CONNECTIONS</h3>
      <ul className="space-y-4">
        {connections.map((conn, index) => (
          <li key={`${conn.name}-${index}`} className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-white">{conn.name}</span>
              <a href={conn.linkedInUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm text-[#0A66C2] hover:underline">LinkedIn →</a>
            </div>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
              {conn.summary.split("\n")[0]}
              {conn.summary.split("\n")[1] != null && <><br />{conn.summary.split("\n")[1]}</>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
