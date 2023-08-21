import { MapAssetInstance } from "./MapAssetInstance";

export interface Scene {
  name: string;
  lastUpdate: string;
  id: number;
  createdAt?: string;
  projectId?: number;
  creating?: boolean;
  mapAsset?: {
    sceneId: number;
    data: MapAssetInstance[]
  };
}
