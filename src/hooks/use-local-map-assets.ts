import { useState } from 'react';
import db from "../dexie/database";
import { MapAssetInstance } from '../interfaces/MapAssetInstance';

function useLocalMapAssets() {
  const [mapAssets, setMapAssets] = useState<MapAssetInstance[]>([]);

  // Método para buscar um mapAsset por ID
  const get = async (id: string) => {
    try {
      const mapAsset = await db.mapAssets.where('id').equals(id).first();
      return mapAsset;
    } catch (error) {
      console.error('Erro ao buscar mapAsset por ID:', error);
      throw error;
    }
  };

  // Método para buscar todos os mapAssets de um projeto
  const getAll = async (projectId: string) => {
    try {
      const allMapAssets = await db.mapAssets.where('projectId').equals(projectId).toArray();
      setMapAssets(allMapAssets);
    } catch (error) {
      console.error('Erro ao buscar todos os mapAssets:', error);
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

  return {
    mapAssets,
    get,
    getAll,
    create,
  };
}

export default useLocalMapAssets;
