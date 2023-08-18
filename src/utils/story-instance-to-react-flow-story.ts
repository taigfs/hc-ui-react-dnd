import { Story } from "../interfaces/Story";
import { Node, Edge } from "react-flow-renderer";

export function storyInstanceToReactFlowStory(story: Story): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = story.nodes.map((node) => ({
    id: node.id.toString(),
    type: "default",
    data: { label: node.name },
    position: { x: 0, y: 0 },
  }));

  const edges: Edge[] = story.edges.map((edge) => ({
    id: edge.id.toString(),
    source: edge.source.toString(),
    target: edge.target.toString(),
    type: "default",
    animated: true,
  }));

  return { nodes, edges };
}
