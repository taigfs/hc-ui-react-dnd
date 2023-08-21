import { MapAssetInstanceDTO } from '../dtos/patch-map-asset-instance-dto';
import axiosInstance from './api';

export abstract class MapAssetInstanceService {
  static async postMapAssetInstance(mapAssetInstanceData: MapAssetInstanceDTO) {
    const response = await axiosInstance.post('/map-asset-instance', mapAssetInstanceData);
    return response.data;
  }
}
