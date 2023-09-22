import { MapAssetInstance } from "../interfaces/MapAssetInstance"

export type GeneratedSceneData = {
  mapString: string,
  map: MapAssetInstance[],
  reasoning?: string
}