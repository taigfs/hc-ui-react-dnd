import { MoveNodeInput } from "./node-inputs/move-node-input.type";
import { NodeType } from "./node.type";

export type ExecutionLogStatus = "success" | "error" | "pending";

export interface ExecutionLog {
  id: string;
  executionId: string;
  nodeId: string;
  nodeType: NodeType;
  inputData: MoveNodeInput | any;
  outputData: any;
  status: ExecutionLogStatus;
  createdAt: string;
  storyId: string;
}
