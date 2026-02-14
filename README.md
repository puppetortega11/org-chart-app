# Org Chart App

Org chart with **Your Network Connections** (warm intros: name, summary, LinkedIn) and an interactive **Relationship Graph** mapping org people to your LinkedIn 1st/2nd/3rd degree connections and wiz.io company followers.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # serve dist/
```

## Edit data

- **Org structure & profiles**: `src/data/org-data.ts` — `people`, `mutualConnections`, `relationshipGraphInput`.
- Add people (id, name, title, reportsToId, linkedInUrl, etc.), mutual connections per person, and LinkedIn/wiz.io data for the relationship graph.

## Tech

- React 19 + TypeScript + Vite
- Tailwind CSS
- react-force-graph-2d (interactive graph)
