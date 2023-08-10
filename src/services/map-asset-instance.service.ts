import axios from 'axios';
import { MapAssetInstanceDTO } from '../dtos/map-asset-instance-dto';

export function postMapAssetInstance(mapAssetInstanceData: MapAssetInstanceDTO) {
  return axios.post('/map-asset-instance', mapAssetInstanceData);
}
