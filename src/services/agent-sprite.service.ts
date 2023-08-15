// src/services/agent-sprite.service.ts
import { MapAssetSpriteService } from './map-asset-sprite.service';

export class AgentSpriteService extends MapAssetSpriteService {
  static async getAgentSprites() {
    const mapAssetSprites = await this.getMapAssetSprites();
    // Perform additional logic to filter and return agent sprites
    // implementation goes here
  }
}
