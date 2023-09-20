// src/services/agent-sprite.service.ts
import axiosInstance from "./api";
import { MapAssetSprite } from "../interfaces/MapAssetSprite";
import { AgentSprite } from "../interfaces/AgentSprite";

export class AgentSpriteService {
  static async getAgentSprites() {
    const response = await axiosInstance.get<AgentSprite[]>('/agent-sprite');
    return response.data;
  }
}
