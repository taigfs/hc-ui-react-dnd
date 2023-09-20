import { Node, Edge } from "reactflow";
import { NodeInstance } from "../interfaces/NodeInstance";
import { EdgeInstance } from "../interfaces/EdgeInstance";

export function instancesToReactFlowElements(nodes: NodeInstance[], edges: EdgeInstance[]): { nodes: Node[]; edges: Edge[] } {
  const reactFlowNodes: Node[] = nodes.map((node) => ({
    id: node.id+``,
    type: node.type,
    data: { ...node.data, label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const reactFlowEdges: Edge[] = [];
  const edgeMap: Map<string, Edge> = new Map();

  edges.forEach((edge) => {
    const edgeId = edge.id+``;
    const sourceNodeId = edge.sourceNodeId;
    const targetNodeId = edge.targetNodeId;
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
      reactFlowEdges.push(newEdge);
      edgeMap.set(edgeKey, newEdge);
    }
  });

  return { nodes: reactFlowNodes, edges: reactFlowEdges };
}
