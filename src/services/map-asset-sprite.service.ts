// src/services/map-asset-sprite.service.ts
import { GenerateSceneDto } from '../dtos/generate-scene-dto';
import { MapAssetInstance } from '../interfaces/MapAssetInstance';
import { MapAssetPosition } from '../interfaces/MapAssetPositions';
import { MapAssetSprite } from '../interfaces/MapAssetSprite';
import { GeneratedSceneData } from '../types/generated-scene-data.type';
import axiosInstance from './api';

export abstract class MapAssetSpriteService {
  static async getMapAssetSprites() {
    const response = await axiosInstance.get<MapAssetSprite[]>('/map-asset-sprite');
    return response.data;
  }

  static async generateScene (dto: GenerateSceneDto) {
    const response = await axiosInstance.post<GeneratedSceneData>('/map-asset-sprite/generate-scene', dto);
    return response.data;
  }
}
