import { useState } from 'react';
import db from "../dexie/database";
import { Scene } from '../interfaces/Scene';
import useLocalMapAssets from './use-local-map-assets';

function useLocalScenes() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const { create: createMapAsset, update: updateMapAsset } = useLocalMapAssets();

  // Método para buscar uma cena por ID
  const get = async (id: string) => {
    try {
      const scene = await db.scenes.where('id').equals(id).first();
      return scene;
    } catch (error) {
      console.error('Erro ao buscar cena por ID:', error);
      throw error;
    }
  };

  // Método para buscar todas as cenas de um projeto
  const getAll = async (projectId: string) => {
    try {
      const allScenes = await db.scenes.where('projectId').equals(projectId).toArray();
      setScenes(allScenes);
    } catch (error) {
      console.error('Erro ao buscar todas as cenas:', error);
    }
  };

  // Método para criar uma nova cena
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

  return {
    scenes,
    get,
    getAll,
    create,
    updateMapAssetData
  };
}

export default useLocalScenes;
