export type NodeId = string;

export type NodeType =
  | "me"
  | "org"
  | "linkedin_1"
  | "linkedin_2"
  | "linkedin_3"
  | "company_follower"
  | "company";

export interface GraphNode {
  id: NodeId;
  name: string;
  type: NodeType;
  linkedInUrl?: string;
  orgId?: NodeId;
}

export interface GraphLink {
  source: NodeId;
  target: NodeId;
  type: "1st" | "2nd" | "3rd" | "org_match" | "follows_company";
}

export interface RelationshipGraphInput {
  orgPeople: { id: NodeId; name: string }[];
  linkedInConnections: {
    id: NodeId;
    name: string;
    degree: 1 | 2 | 3;
    connectedVia?: NodeId;
    linkedInUrl?: string;
  }[];
  companyFollowers: { id: NodeId; name: string; linkedInUrl?: string }[];
  companyName?: string;
  orgToNetworkMappings: { orgPersonId: NodeId; networkNodeId: NodeId }[];
}
