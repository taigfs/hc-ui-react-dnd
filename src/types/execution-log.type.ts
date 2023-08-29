export interface ExecutionLog {
  id: number;
  executionId: string;
  nodeId: number;
  nodeType: string;
  inputData: {
    agent: number;
    moveToX: number;
    moveToY: number;
  };
  outputData: any;
  status: string;
  createdAt: string;
  storyId: number;
}
