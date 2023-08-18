export interface PatchEdgeDTO {
  id: number;
  updates: {
    sourceNodeId: number;
    targetNodeId: number;
    sourceHandle: string;
    targetHandle: string;
  }
}
