export interface BackendNode {
  id: number;
  type: string;
  x: number;
  y: number;
  label: string;
  data: any;
  storyId: number;
  createdAt: string;
  edgesFrom: BackendEdge[];
  edgesTo: BackendEdge[];
}
