import { useState } from "react";
import { people } from "./data/org-data";
import { OrgTree } from "./components/OrgTree";
import { DetailPanel } from "./components/DetailPanel";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>("grant-bourzikas");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-xl font-semibold">Engineering & Security Org</h1>
      </header>
      <div className="flex-1 flex min-h-0">
        <aside className="w-80 border-r border-gray-800 overflow-y-auto p-4">
          <h2 className="text-sm font-medium text-gray-400 mb-3">Org chart</h2>
          <OrgTree people={people} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        <main className="flex-1 overflow-y-auto p-6 max-w-2xl">
          <DetailPanel selectedId={selectedId} />
        </main>
      </div>
    </div>
  );
}

export default App;
