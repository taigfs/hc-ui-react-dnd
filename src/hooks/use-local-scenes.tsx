import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { Scene } from '../interfaces/Scene';
import useLocalMapAssets from './use-local-map-assets';

interface ScenesContextProps {
  scenes: Scene[];
  get: (id: string) => Promise<Scene | undefined>;
  getAll: (projectId: string) => void;
  create: (scene: Scene) => Promise<void>;
  updateMapAssetData: (sceneId: string, data: any) => Promise<void>;
}

const ScenesContext = createContext<ScenesContextProps | undefined>(undefined);

export function ScenesProvider({ children }: { children: ReactNode }) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const { create: createMapAsset, update: updateMapAsset } = useLocalMapAssets();

  const get = async (id: string) => {
    try {
      const scene = await db.scenes.where('id').equals(id).first();
      return scene;
    } catch (error) {
      console.error('Erro ao buscar cena por ID:', error);
      throw error;
    }
  };

  const getAll = async (projectId: string) => {
    try {
      const allScenes = await db.scenes.where('projectId').equals(projectId).toArray();
      setScenes(allScenes);
    } catch (error) {
      console.error('Erro ao buscar todas as cenas:', error);
    }
  };

  const create = async (scene: Scene) => {
    try {
      const sceneIndex = await db.scenes.add(scene);
      const newScene = await db.scenes.get(sceneIndex);
      
      if (!newScene?.id) { throw new Error('Error creating scene'); }

      createMapAsset({
        sceneId: newScene.id,
        data: {}
      });
    } catch (error) {
      console.error('Erro ao criar cena:', error);
      throw error;
    }
  };

  const updateMapAssetData = async (sceneId: string, data: any) => {
    try {
      const mapAsset = await db.mapAssets.where('sceneId').equals(sceneId).first();
      if (!mapAsset?.id) { throw new Error('Error updating mapAsset data'); }

      await updateMapAsset({
        ...mapAsset,
        data
      });
    } catch (error) {
      console.error('Erro ao atualizar dados do mapAsset:', error);
      throw error;
    }
  }

  return (
    <ScenesContext.Provider value={{ scenes, get, getAll, create, updateMapAssetData }}>
      {children}
    </ScenesContext.Provider>
  );
}

export default function useLocalScenes() {
  const context = useContext(ScenesContext);
  if (!context) {
    throw new Error('useLocalScenes must be used within a ScenesProvider');
  }
  return context;
}
