import { MoveNodeInput } from "./node-inputs/move-node-input.type";

export type ExecutionLogStatus = "success" | "error" | "pending";

export interface ExecutionLog {
  id: number;
  executionId: string;
  nodeId: number;
  nodeType: string;
  inputData: MoveNodeInput | any;
  outputData: any;
  status: ExecutionLogStatus;
  createdAt: string;
  storyId: number;
}
