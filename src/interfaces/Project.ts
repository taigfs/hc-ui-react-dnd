import { Scene } from "./Scene";
import { Story } from "./Story";

export interface Project {
  id?: string;
  oid?: string;
  name?: string;
  owner?: string;
  lastUpdate?: string;
  createdAt?: string;
  creating?: boolean;
  stories?: Partial<Story>[];
  scenes?: Partial<Scene>[];
}
