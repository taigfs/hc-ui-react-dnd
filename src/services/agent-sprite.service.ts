// src/services/agent-sprite.service.ts
import axiosInstance from "./api";
import { MapAssetSprite } from "../interfaces/MapAssetSprite";

export class AgentSpriteService {
  static async getAgentSprites() {
    const response = await axiosInstance.get<MapAssetSprite[]>('/map-asset-sprite');
    return response.data;
  }
}
