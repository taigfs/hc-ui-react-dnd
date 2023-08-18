import { EdgeInstance } from "./EdgeInstance";

export interface NodeInstance {
  id: number;
  type: string;
  x: number;
  y: number;
  label: string;
  data: any;
  storyId: number;
  createdAt: string;
  edgesFrom: EdgeInstance[];
  edgesTo: EdgeInstance[];
}
