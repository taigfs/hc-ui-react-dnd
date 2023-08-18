export interface EdgeInstance {
  id: number;
  sourceNodeId: number;
  targetNodeId: number;
  sourceHandle: string;
  targetHandle: string;
  data: any;
}
