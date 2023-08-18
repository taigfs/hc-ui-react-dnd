import { Story } from "../interfaces/Story";
import { Node, Edge } from "reactflow";

export function storyInstanceToReactFlowStory(story: Story): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = story.nodes.map((node) => ({
    id: node.id.toString(),
    type: "default",
    data: { label: node.label },
    position: { x: node.x, y: node.y },
  }));

  const edges: Edge[] = story.nodes.flatMap((node) =>
    node.edges.map((edge) => ({
      id: edge.id.toString(),
      source: edge.sourceNodeId.toString(),
      target: edge.targetNodeId.toString(),
      type: "default",
      animated: true,
    }))
  );

  return { nodes, edges };
}
