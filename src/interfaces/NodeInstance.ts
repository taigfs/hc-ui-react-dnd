import { EdgeInstance } from "./EdgeInstance";

export interface NodeInstance {
  id?: string;
  type: string;
  x: number;
  y: number;
  label: string;
  data: any;
  storyId: string;
  createdAt?: string;
  edgesFrom?: EdgeInstance[];
  edgesTo?: EdgeInstance[];
}
