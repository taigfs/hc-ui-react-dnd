import { Story } from "../interfaces/Story";
import { Node, Edge } from "reactflow";

export function storyInstanceToReactFlowStory(story: Story): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = story.nodes.map((node) => ({
    id: `n_${node.id.toString()}`,
    type: node.type,
    data: { ...node.data, label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const edges: Edge[] = [];
  const edgeMap: Map<string, Edge> = new Map();

  story.nodes.forEach((node) => {
    node.edgesFrom.forEach((edge) => processEdges(edge, edges, edgeMap));
    node.edgesTo.forEach((edge) => processEdges(edge, edges, edgeMap));
  });

  return { nodes, edges };
}

function processEdges(edge: any, edges: Edge[], edgeMap: Map<string, Edge>) {
  const edgeId = `e_${edge.id.toString()}`;
  const sourceNodeId = `n_${edge.sourceNodeId.toString()}`;
  const targetNodeId = `n_${edge.targetNodeId.toString()}`;
  const edgeKey = `${sourceNodeId}-${targetNodeId}`;

  if (!edgeMap.has(edgeKey)) {
    const newEdge: Edge = {
      id: edgeId,
      source: sourceNodeId,
      target: targetNodeId,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      type: 'default',
    };
    edges.push(newEdge);
    edgeMap.set(edgeKey, newEdge);
  }
}





