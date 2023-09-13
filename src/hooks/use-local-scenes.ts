import { useState } from 'react';
import db from "../dexie/database";
import { Scene } from '../interfaces/Scene';

function useLocalScenes() {
  const [scenes, setScenes] = useState<Scene[]>([]);

  // Método para buscar uma cena por ID
  const get = async (id: string) => {
    try {
      const scene = await db.scenes.where('oid').equals(id).first();
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
      await db.scenes.add(scene);
    } catch (error) {
      console.error('Erro ao criar cena:', error);
      throw error;
    }
  };

  return {
    scenes,
    get,
    getAll,
    create,
  };
}

export default useLocalScenes;
