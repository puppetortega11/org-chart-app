# Org Chart App

A generic tool to build **org charts** and **relationship maps** so you can see account structure and your path in. Useful for sales and biz dev: map the org, add your LinkedIn 1st/2nd/3rd degree connections and company followers, and see who you know (or can reach) at the account.

- **Enter company name** to start, then browse the org tree and person details.
- **Your Network Connections**: per-person list of warm intro contacts (name, short summary, LinkedIn).
- **Relationship Graph**: interactive map of you ↔ LinkedIn connections ↔ org chart ↔ company followers. Zoom, pan, drag nodes; click a node to open LinkedIn when available.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Enter any company name to continue.

## Build

```bash
npm run build
npm run preview   # serve dist/
```

## Edit data

- **Org structure & profiles**: `src/data/org-data.ts` — `people`, `mutualConnections`, `relationshipGraphInput`.
- Replace the sample data with your target account: add people (id, name, title, reportsToId, linkedInUrl), mutual connections per person, and LinkedIn/company-follower data for the relationship graph.

## Tech

- React 19 + TypeScript + Vite
- Tailwind CSS
- react-force-graph-2d (interactive graph)
