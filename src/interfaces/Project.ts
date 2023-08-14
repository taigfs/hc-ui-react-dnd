import { Scene } from "./Scene";
import { Story } from "./Story";

export interface Project {
  id?: number;
  name?: string;
  owner?: string;
  lastUpdate?: string;
  creating?: boolean;
  stories?: Partial<Story>[];
  scenes?: Partial<Scene>[];
}
