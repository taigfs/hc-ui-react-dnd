import { Node, Edge } from "reactflow";
import { NodeInstance } from "../interfaces/NodeInstance";
import { EdgeInstance } from "../interfaces/EdgeInstance";
import { getDiagramNodeId } from "./get-diagram-node-id";

export function instancesToReactFlowElements(nodes: NodeInstance[], edges: EdgeInstance[]): { nodes: Node[]; edges: Edge[] } {
  const reactFlowNodes: Node[] = nodes.map((node) => ({
    id: `n_${node.id.toString()}`,
    type: node.type,
    data: { ...node.data, label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const reactFlowEdges: Edge[] = [];
  const edgeMap: Map<string, Edge> = new Map();

  edges.forEach((edge) => {
    const edgeId = `e_${edge.id.toString()}`;
    const sourceNodeId = getDiagramNodeId(edge.sourceNodeId.toString());
    const targetNodeId = getDiagramNodeId(edge.targetNodeId.toString());
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
