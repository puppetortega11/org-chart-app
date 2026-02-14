import { useState } from "react";
import { people } from "./data/org-data";
import { OrgTree } from "./components/OrgTree";
import { DetailPanel } from "./components/DetailPanel";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(people[0]?.id ?? null);

  const displayName = (companyName.trim() || "Org Chart").trim();
  const showChart = submitted && displayName.length > 0;

  if (!showChart) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">Org Chart & Relationship Map</h1>
          <p className="text-gray-400 text-sm text-center">
            Build org charts and map your network into the account. Enter the company name to get started.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-300">
              Company name
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">{displayName}</h1>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setCompanyName("");
          }}
          className="text-sm text-gray-400 hover:text-gray-300"
        >
          Change company
        </button>
      </header>
      <div className="flex-1 flex min-h-0">
        <aside className="w-80 border-r border-gray-800 overflow-y-auto p-4">
          <h2 className="text-sm font-medium text-gray-400 mb-3">Org chart</h2>
          <OrgTree people={people} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        <main className="flex-1 overflow-y-auto p-6 max-w-2xl">
          <DetailPanel selectedId={selectedId} companyName={displayName} />
        </main>
      </div>
    </div>
  );
}

export default App;
