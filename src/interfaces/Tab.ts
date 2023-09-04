import { Scene } from "./Scene";
import { Story } from "./Story";

export interface Tab {
  type: 'scene' | 'story' | 'metadata' | 'data';
  data: Scene | Story | any;
}