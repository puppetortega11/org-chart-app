import type { OrgPerson } from "../data/org-data";

interface OrgTreeProps {
  people: OrgPerson[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function getRoots(people: OrgPerson[]) {
  return people.filter((p) => !p.reportsToId || p.reportsToId === null);
}

function getChildren(people: OrgPerson[], parentId: string) {
  return people.filter((p) => p.reportsToId === parentId);
}

function TreeNode({
  person,
  people,
  selectedId,
  onSelect,
  depth,
}: {
  person: OrgPerson;
  people: OrgPerson[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  depth: number;
}) {
  const children = getChildren(people, person.id);
  const isSelected = selectedId === person.id;

  return (
    <div className="border-l border-gray-700 pl-3" style={{ marginLeft: depth * 14 }}>
      <button
        type="button"
        onClick={() => onSelect(person.id)}
        className={`text-left w-full py-1.5 px-2 rounded text-sm transition-colors ${
          isSelected ? "bg-indigo-600/40 text-white" : "text-gray-300 hover:bg-gray-700/50"
        }`}
      >
        <span className="font-medium">{person.name}</span>
        {person.title && <span className="text-gray-500 ml-1">— {person.title}</span>}
      </button>
      {children.length > 0 && (
        <div className="mt-1">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              person={child}
              people={people}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrgTree({ people, selectedId, onSelect }: OrgTreeProps) {
  const roots = getRoots(people);

  return (
    <div className="space-y-1">
      {roots.map((person) => (
        <TreeNode
          key={person.id}
          person={person}
          people={people}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={0}
        />
      ))}
    </div>
  );
}
