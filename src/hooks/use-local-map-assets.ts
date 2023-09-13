import { useState } from 'react';
import db from "../dexie/database";
import { MapAssetInstance } from '../interfaces/MapAssetInstance';

function useLocalMapAssets() {
  const [mapAsset, setMapAsset] = useState<MapAssetInstance | null>(null);

  // Método para buscar um mapAsset por ID
  const get = async (sceneId: string) => {
    try {
      const mapAsset = await db.mapAssets.where('sceneId').equals(sceneId).first();
      if (!mapAsset) { throw new Error('mapAsset not found'); }

      setMapAsset(mapAsset);
      return mapAsset;
    } catch (error) {
      console.error('Erro ao buscar mapAsset por ID:', error);
      throw error;
    }
  };

  // Método para criar um novo mapAsset
  const create = async (mapAsset: MapAssetInstance) => {
    try {
      await db.mapAssets.add(mapAsset);
      console.log('criei');
    } catch (error) {
      console.error('Erro ao criar mapAsset:', error);
      throw error;
    }
  };

  const update = async (mapAsset: MapAssetInstance) => {
    if (!mapAsset.id) { throw new Error('mapAsset.id is required'); }
    
    try {
      const key = await db.mapAssets.where('id').equals(mapAsset.id).primaryKeys();
      
      if (!key.length) { throw new Error('mapAsset key not found'); }

      await db.mapAssets.update(key[0], mapAsset);
    } catch (error) {
      console.error('Erro ao atualizar mapAsset:', error);
      throw error;
    }
  }

  return {
    mapAsset,
    get,
    create,
    update
  };
}

export default useLocalMapAssets;
