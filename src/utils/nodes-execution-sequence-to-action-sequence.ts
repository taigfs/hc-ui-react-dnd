import { NodeInstance } from "../interfaces/NodeInstance";
import { ActionData, ActionSequence } from "../types/action-data.type";

export const nodeExecutionSequenceToActionSequence = (
  nodes: NodeInstance[]
): ActionSequence => {
  const actionSequence: ActionSequence = [];
  // filter only nodes with type move
  const supportedNodeTypes = (node: NodeInstance) => node.type === "move";
  const supportedNodes = nodes.filter(supportedNodeTypes);

  return supportedNodes.map((node): ActionData => {
    switch (node.type) {
      case "move":
        return {
          type: "moveAgent",
          boardX: Number(node.data.actionData?.moveToX || 0),
          boardY: Number(node.data.actionData?.moveToY || 0),
          id: node.data.actionData?.agent.toString(),
        };
      // Add other node.type cases if needed
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  });
};
