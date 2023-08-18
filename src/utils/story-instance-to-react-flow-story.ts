import { Story } from "../interfaces/Story";
import { Node, Edge } from "reactflow";

export function storyInstanceToReactFlowStory(story: Story): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = story.nodes.map((node) => ({
    id: node.id.toString(),
    type: node.type,
    data: { label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const edges: Edge[] = story.nodes.flatMap((node) => {
      return node.edgesFrom.concat(node.edgesTo).map((edge) => ({
        id: edge.id.toString(),
        source: edge.sourceNodeId.toString(),
        target: edge.targetNodeId.toString(),
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        type: 'default',
      }));
    }
  );

  console.log({ nodes, edges })
  return { nodes, edges };
}
