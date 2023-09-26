import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { MapAssetInstance } from '../interfaces/MapAssetInstance';

interface MapAssetsContextProps {
  mapAsset: MapAssetInstance | null;
  get: (sceneId: string) => Promise<MapAssetInstance | undefined>;
  create: (mapAsset: MapAssetInstance) => Promise<void>;
  update: (mapAsset: MapAssetInstance) => Promise<void>;
}

const MapAssetsContext = createContext<MapAssetsContextProps | undefined>(undefined);

export function MapAssetsProvider({ children }: { children: ReactNode }) {
  const [mapAsset, setMapAsset] = useState<MapAssetInstance | null>(null);

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

  const create = async (mapAsset: MapAssetInstance) => {
    try {
      await db.mapAssets.add(mapAsset);
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

  return (
    <MapAssetsContext.Provider value={{ mapAsset, get, create, update }}>
      {children}
    </MapAssetsContext.Provider>
  );
}

export default function useLocalMapAssets() {
  const context = useContext(MapAssetsContext);
  if (!context) {
    throw new Error('useLocalMapAssets must be used within a MapAssetsProvider');
  }
  return context;
}
