export interface EdgeInstance {
  id?: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle: string;
  targetHandle: string;
  data?: any;
}
