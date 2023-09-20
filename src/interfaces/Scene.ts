import { MapAssetInstance } from "./MapAssetInstance";

export interface Scene {
  name: string;
  lastUpdate?: string;
  id?: string;
  createdAt?: string;
  projectId?: string;
  creating?: boolean;
  mapAsset?: {
    sceneId: string;
    data: MapAssetInstance[]
  };
}
