// src/services/map-asset-sprite.service.ts
import { MapAssetSprite } from '../interfaces/MapAssetSprite';
import axiosInstance from './api';

export abstract class MapAssetSpriteService {
  static async getMapAssetSprites() {
    const response = await axiosInstance.get<MapAssetSprite[]>('/map-asset-sprite');
    return response.data;
  }
}
