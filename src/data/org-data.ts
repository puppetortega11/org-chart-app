/**
 * Org chart data: hierarchy, mutual connections, and relationship graph input.
 * Edit this file to match your org and your LinkedIn/wiz.io data.
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

/** Flat list of everyone; reportsToId / directReportIds define the tree. */
export const people: OrgPerson[] = [
  { id: "matthew-prince", name: "Matthew Prince", title: "CEO, Co-Founder", location: "San Francisco, CA", tags: ["C-Suite", "P1 - Highest Priority"], linkedInUrl: "https://www.linkedin.com/in/matthewprince", reportsToId: null, directReportIds: ["grant-bourzikas"] },
  { id: "grant-bourzikas", name: "Grant Bourzikas", title: "CSO, SVP", location: "San Francisco, CA", tags: ["Security", "C-Suite", "P1 - Highest Priority"], linkedInUrl: "https://www.linkedin.com/in/grantbourzikas", reportsToId: "matthew-prince", directReportIds: ["blake-darche", "sri-pulla", "derek-chamorro"] },
  { id: "blake-darche", name: "Blake Darche", title: "VP Security", reportsToId: "grant-bourzikas", directReportIds: [] },
  { id: "sri-pulla", name: "Sri Pulla", title: "VP Engineering", reportsToId: "grant-bourzikas", directReportIds: [] },
  { id: "derek-chamorro", name: "Derek Chamorro", title: "Director Security", reportsToId: "grant-bourzikas", directReportIds: [] },
];

/** Mutual connections for warm intros. Key = person id. */
export const mutualConnections: Record<string, { name: string; summary: string; linkedInUrl: string }[]> = {
  "grant-bourzikas": [
    { name: "Blake Darche", summary: "Former colleague; security initiatives.\nCan speak to his leadership in incident response.", linkedInUrl: "https://www.linkedin.com/in/blakedarche" },
    { name: "Sri Pulla", summary: "Met at RSA Conference 2023; zero-trust track.\nAlumni connection.", linkedInUrl: "https://www.linkedin.com/in/sripulla" },
    { name: "Derek Chamorro", summary: "Cloudflare partner ecosystem; joint customer calls.\nStrong DDoS and edge security.", linkedInUrl: "https://www.linkedin.com/in/derekchamorro" },
  ],
};

/** Input for the Relationship Graph (org ↔ LinkedIn 1st/2nd/3rd + wiz.io followers). */
export const relationshipGraphInput = {
  companyName: "wiz.io",
  orgPeople: people.map((p) => ({ id: p.id, name: p.name })),
  linkedInConnections: [
    { id: "blake-darche", name: "Blake Darche", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/blakedarche" },
    { id: "sri-pulla", name: "Sri Pulla", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/sripulla" },
    { id: "jane-security", name: "Jane Security", degree: 1 as const, linkedInUrl: "https://www.linkedin.com/in/janesecurity" },
    { id: "alex-cloud", name: "Alex Cloud", degree: 2 as const, connectedVia: "blake-darche", linkedInUrl: "https://www.linkedin.com/in/alexcloud" },
    { id: "derek-chamorro", name: "Derek Chamorro", degree: 2 as const, connectedVia: "blake-darche", linkedInUrl: "https://www.linkedin.com/in/derekchamorro" },
  ],
  companyFollowers: [
    { id: "grant-bourzikas", name: "Grant Bourzikas", linkedInUrl: "https://www.linkedin.com/in/grantbourzikas" },
    { id: "matthew-prince", name: "Matthew Prince", linkedInUrl: "https://www.linkedin.com/in/matthewprince" },
  ],
  orgToNetworkMappings: [
    { orgPersonId: "blake-darche", networkNodeId: "blake-darche" },
    { orgPersonId: "sri-pulla", networkNodeId: "sri-pulla" },
    { orgPersonId: "derek-chamorro", networkNodeId: "derek-chamorro" },
    { orgPersonId: "grant-bourzikas", networkNodeId: "grant-bourzikas" },
    { orgPersonId: "matthew-prince", networkNodeId: "matthew-prince" },
  ],
};
