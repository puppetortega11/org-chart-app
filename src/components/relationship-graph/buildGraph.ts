import type { RelationshipGraphInput, GraphNode, GraphLink, NodeId } from "./types";

const ME_NODE_ID: NodeId = "__me__";
const COMPANY_NODE_ID: NodeId = "__company__";

export function buildRelationshipGraph(input: RelationshipGraphInput): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const companyName = input.companyName ?? "Company";

  nodes.push({ id: ME_NODE_ID, name: "You", type: "me" });
  nodes.push({ id: COMPANY_NODE_ID, name: companyName, type: "company" });

  for (const p of input.orgPeople) {
    nodes.push({ id: `org:${p.id}`, name: p.name, type: "org", orgId: p.id });
  }

  const connectionNodeIds = new Set<NodeId>();
  for (const c of input.linkedInConnections) {
    const id = `li:${c.id}`;
    if (connectionNodeIds.has(id)) continue;
    connectionNodeIds.add(id);
    nodes.push({
      id,
      name: c.name,
      type: `linkedin_${c.degree}` as GraphNode["type"],
      linkedInUrl: c.linkedInUrl,
    });
  }

  for (const c of input.linkedInConnections) {
    const targetId = `li:${c.id}`;
    if (c.degree === 1) {
      links.push({ source: ME_NODE_ID, target: targetId, type: "1st" });
    } else if (c.degree === 2 && c.connectedVia) {
      links.push({ source: `li:${c.connectedVia}`, target: targetId, type: "2nd" });
    } else if (c.degree === 3 && c.connectedVia) {
      links.push({ source: `li:${c.connectedVia}`, target: targetId, type: "3rd" });
    }
  }

  for (const f of input.companyFollowers) {
    const id = `follower:${f.id}`;
    nodes.push({ id, name: f.name, type: "company_follower", linkedInUrl: f.linkedInUrl });
    links.push({ source: id, target: COMPANY_NODE_ID, type: "follows_company" });
  }

  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const m of input.orgToNetworkMappings) {
    const sourceId = `org:${m.orgPersonId}`;
    const liId = `li:${m.networkNodeId}`;
    const followerId = `follower:${m.networkNodeId}`;
    const targetId = nodeIds.has(liId) ? liId : nodeIds.has(followerId) ? followerId : liId;
    if (targetId !== sourceId && nodeIds.has(sourceId) && nodeIds.has(targetId)) {
      links.push({ source: sourceId, target: targetId, type: "org_match" });
    }
  }

  return { nodes, links };
}
