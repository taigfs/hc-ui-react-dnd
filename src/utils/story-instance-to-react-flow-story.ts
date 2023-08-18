import { Story } from "../interfaces/Story";
import { Node, Edge } from "reactflow";

export function storyInstanceToReactFlowStory(story: Story): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = story.nodes.map((node) => ({
    id: node.id.toString(),
    type: node.type,
    data: { label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const edges: Edge[] = [];
  const edgeMap: Map<string, Edge> = new Map();

  story.nodes.forEach((node) => {
    node.edgesFrom.forEach((edge) => {
      const edgeId = edge.id.toString();
      const sourceNodeId = edge.sourceNodeId.toString();
      const targetNodeId = edge.targetNodeId.toString();
      const sourceHandle = edge.sourceHandle;
      const targetHandle = edge.targetHandle;

      const edgeKey = `${sourceNodeId}-${targetNodeId}`;
      if (!edgeMap.has(edgeKey)) {
        const newEdge: Edge = {
          id: edgeId,
          source: sourceNodeId,
          target: targetNodeId,
          sourceHandle: sourceHandle,
          targetHandle: targetHandle,
          type: 'default',
        };
        edges.push(newEdge);
        edgeMap.set(edgeKey, newEdge);
      }
    });

    node.edgesTo.forEach((edge) => {
      const edgeId = edge.id.toString();
      const sourceNodeId = edge.sourceNodeId.toString();
      const targetNodeId = edge.targetNodeId.toString();
      const sourceHandle = edge.sourceHandle;
      const targetHandle = edge.targetHandle;

      const edgeKey = `${sourceNodeId}-${targetNodeId}`;
      if (!edgeMap.has(edgeKey)) {
        const newEdge: Edge = {
          id: edgeId,
          source: sourceNodeId,
          target: targetNodeId,
          sourceHandle: sourceHandle,
          targetHandle: targetHandle,
          type: 'default',
        };
        edges.push(newEdge);
        edgeMap.set(edgeKey, newEdge);
      }
    });
  });

  console.log({ nodes, edges });
  return { nodes, edges };
}
