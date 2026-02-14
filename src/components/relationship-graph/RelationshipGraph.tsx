import { useCallback, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { GraphNode, GraphLink, NodeType } from "./types";

export interface RelationshipGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

const NODE_COLORS: Record<NodeType, string> = {
  me: "#6366f1",
  org: "#22c55e",
  linkedin_1: "#0ea5e9",
  linkedin_2: "#38bdf8",
  linkedin_3: "#7dd3fc",
  company_follower: "#f59e0b",
  company: "#a855f7",
};

const NODE_RADIUS: Record<NodeType, number> = {
  me: 12,
  company: 11,
  org: 8,
  linkedin_1: 7,
  linkedin_2: 6,
  linkedin_3: 5,
  company_follower: 6,
};

export function RelationshipGraph({
  nodes,
  links,
  title = "Relationship Graph",
  width,
  height = 400,
  className = "",
}: RelationshipGraphProps) {
  const graphData = useMemo(() => ({
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ source: l.source, target: l.target, type: l.type })),
  }), [nodes, links]);

  const nodeCanvasObject = useCallback(
    (node: GraphNode & { x?: number; y?: number }, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const type = node.type ?? "linkedin_1";
      const label = node.name;
      const radius = NODE_RADIUS[type] ?? 6;
      const color = NODE_COLORS[type] ?? "#64748b";
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1 / globalScale;
      ctx.stroke();
      if (globalScale > 0.8 && label) {
        ctx.font = `${10 / globalScale}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText(label, x, y + radius + 6 / globalScale);
      }
    },
    []
  );

  const nodeLabel = useCallback((node: GraphNode) => {
    const typeLabel =
      node.type === "me" ? "You" :
      node.type === "org" ? "Org chart" :
      node.type === "linkedin_1" ? "1st degree" :
      node.type === "linkedin_2" ? "2nd degree" :
      node.type === "linkedin_3" ? "3rd degree" :
      node.type === "company_follower" ? "Follows wiz.io" :
      node.type === "company" ? "Company" : "";
    const lines = [node.name, typeLabel];
    if (node.linkedInUrl) lines.push("LinkedIn");
    return lines.join(" · ");
  }, []);

  const linkColor = useCallback((link: { type?: string }) => {
    switch (link.type) {
      case "1st": return "rgba(14, 165, 233, 0.7)";
      case "2nd": return "rgba(56, 189, 248, 0.5)";
      case "3rd": return "rgba(125, 211, 252, 0.4)";
      case "org_match": return "rgba(34, 197, 94, 0.8)";
      case "follows_company": return "rgba(245, 158, 11, 0.6)";
      default: return "rgba(100, 116, 139, 0.5)";
    }
  }, []);

  const onNodeClick = useCallback((node: GraphNode & { linkedInUrl?: string }) => {
    if (node.linkedInUrl && typeof window !== "undefined") {
      window.open(node.linkedInUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <section className={className}>
      <h3 className="text-sm font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-xs text-gray-500 mb-2">
        You (center) · 1st/2nd/3rd degree LinkedIn · org chart · wiz.io followers. Drag to pan, scroll to zoom, click node for LinkedIn.
      </p>
      <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 overflow-hidden">
        <ForceGraph2D
          graphData={graphData}
          width={width}
          height={height}
          nodeId="id"
          nodeCanvasObject={nodeCanvasObject}
          nodeLabel={nodeLabel}
          linkColor={linkColor}
          linkWidth={1}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={1}
          onNodeClick={onNodeClick}
          backgroundColor="rgba(17, 24, 39, 0.95)"
          enableNodeDrag
          enableZoomInteraction
          enablePanInteraction
        />
      </div>
      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#6366f1] mr-1" />You</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] mr-1" />Org</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#0ea5e9] mr-1" />1st</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#38bdf8] mr-1" />2nd</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#7dd3fc] mr-1" />3rd</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] mr-1" />Wiz follower</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-[#a855f7] mr-1" />wiz.io</span>
      </div>
    </section>
  );
}
