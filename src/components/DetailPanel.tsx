import type { OrgPerson } from "../data/org-data";
import { people, mutualConnections, relationshipGraphInput } from "../data/org-data";
import { buildRelationshipGraph } from "./relationship-graph/buildGraph";
import { RelationshipGraph } from "./relationship-graph/RelationshipGraph";
import { NetworkConnections } from "./NetworkConnections";

interface DetailPanelProps {
  selectedId: string | null;
  /** Company name for the relationship graph (e.g. from "Enter company name"). */
  companyName?: string;
}

function getReportingChain(peopleList: OrgPerson[], personId: string): OrgPerson[] {
  const person = peopleList.find((p: OrgPerson) => p.id === personId);
  if (!person || !person.reportsToId) return [];
  const manager = peopleList.find((p: OrgPerson) => p.id === person.reportsToId);
  if (!manager) return [];
  return [...getReportingChain(peopleList, manager.id), manager];
}

export function DetailPanel({ selectedId, companyName }: DetailPanelProps) {
  if (!selectedId) {
    return (
      <div className="text-gray-500 text-sm p-4">
        Select a person from the org chart.
      </div>
    );
  }

  const person = people.find((p: OrgPerson) => p.id === selectedId);
  if (!person) return null;

  const reportingChain = getReportingChain(people, selectedId);
  const directReports = people.filter((p: OrgPerson) => p.reportsToId === selectedId);
  const graphInput = { ...relationshipGraphInput, companyName: companyName || relationshipGraphInput.companyName };
  const { nodes, links } = buildRelationshipGraph(graphInput);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{person.name}</h2>
        {person.title && <p className="text-gray-400 text-sm">{person.title}</p>}
        {person.location && <p className="text-gray-500 text-xs">{person.location}</p>}
        {person.tags && person.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {person.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">{tag}</span>
            ))}
          </div>
        )}
        {person.linkedInUrl && (
          <a
            href={person.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-[#0A66C2] hover:underline"
          >
            LinkedIn Profile →
          </a>
        )}
      </div>

      {reportingChain.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">REPORTING CHAIN TO CEO</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            {reportingChain.map((p) => (
              <li key={p.id}>{p.name} — {p.title}</li>
            ))}
          </ul>
        </section>
      )}

      {directReports.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">DIRECT REPORTS ({directReports.length})</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            {directReports.map((p) => (
              <li key={p.id}>{p.name} — {p.title}</li>
            ))}
          </ul>
        </section>
      )}

      <NetworkConnections personId={selectedId} mutualConnections={mutualConnections} />

      <RelationshipGraph nodes={nodes} links={links} title="Relationship Graph" height={420} companyName={companyName} />
    </div>
  );
}
