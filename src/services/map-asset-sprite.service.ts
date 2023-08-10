// src/services/map-asset-sprite.service.ts
import axiosInstance from './api';

export abstract class MapAssetSpriteService {
  static async getMapAssetSprites() {
    const response = await axiosInstance.get('/map-asset-sprite');
    return response.data;
  }
}
