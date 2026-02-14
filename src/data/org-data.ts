/**
 * Org chart data: hierarchy, mutual connections, and relationship graph input.
 * Replace with your own account/org data. Use this as a template.
 */

export interface OrgPerson {
  id: string;
  name: string;
  title?: string;
  location?: string;
  tags?: string[];
  linkedInUrl?: string;
  reportsToId?: string | null;
  directReportIds?: string[];
}

/** Flat list of everyone; reportsToId defines the tree. */
export const people: OrgPerson[] = [
  { id: "ceo", name: "Jordan Smith", title: "CEO", location: "New York, NY", tags: ["C-Suite", "Decision maker"], reportsToId: null },
  { id: "vp-sales", name: "Sam Rivera", title: "VP Sales", location: "Chicago, IL", tags: ["Sales", "Champion"], reportsToId: "ceo" },
  { id: "vp-eng", name: "Alex Chen", title: "VP Engineering", location: "Austin, TX", tags: ["Technical"], reportsToId: "ceo" },
  { id: "ae-east", name: "Morgan Taylor", title: "Account Executive, East", reportsToId: "vp-sales" },
  { id: "ae-west", name: "Casey Jones", title: "Account Executive, West", reportsToId: "vp-sales" },
  { id: "eng-lead", name: "Riley Kim", title: "Engineering Lead", reportsToId: "vp-eng" },
];

/** Mutual connections for warm intros. Key = person id. */
export const mutualConnections: Record<string, { name: string; summary: string; linkedInUrl: string }[]> = {
  "vp-sales": [
    { name: "Morgan Taylor", summary: "Former colleague; worked together on enterprise deals.\nCan provide intro to the team.", linkedInUrl: "https://www.linkedin.com/in/example" },
    { name: "Casey Jones", summary: "Same alumni network; met at conference.\nWarm relationship for outreach.", linkedInUrl: "https://www.linkedin.com/in/example" },
  ],
};

/** Input for the Relationship Graph (org ↔ LinkedIn 1st/2nd/3rd + company followers). */
export const relationshipGraphInput = {
  companyName: "Acme Corp",
  orgPeople: people.map((p) => ({ id: p.id, name: p.name })),
  linkedInConnections: [
    { id: "vp-sales", name: "Sam Rivera", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/example" },
    { id: "ae-east", name: "Morgan Taylor", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/example" },
    { id: "conn-1", name: "Jamie Lee", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/example" },
    { id: "conn-2", name: "Taylor Brooks", degree: 2 as const, connectedVia: "vp-sales", linkedInUrl: "https://www.linkedin.com/in/example" },
    { id: "ae-west", name: "Casey Jones", degree: 2 as const, connectedVia: "ae-east", linkedInUrl: "https://www.linkedin.com/in/example" },
  ],
  companyFollowers: [
    { id: "ceo", name: "Jordan Smith", linkedInUrl: "https://www.linkedin.com/in/example" },
    { id: "vp-sales", name: "Sam Rivera", linkedInUrl: "https://www.linkedin.com/in/example" },
  ],
  orgToNetworkMappings: [
    { orgPersonId: "vp-sales", networkNodeId: "vp-sales" },
    { orgPersonId: "ae-east", networkNodeId: "ae-east" },
    { orgPersonId: "ae-west", networkNodeId: "ae-west" },
    { orgPersonId: "ceo", networkNodeId: "ceo" },
  ],
};
