import { Scene } from '../interfaces/Scene';
import axiosInstance from '../services/api';

export abstract class SceneService {
  static async getScenes(projectId: string) {
    const response = await axiosInstance.get<Scene[]>(`/scene?projectId=${projectId}`);
    return response.data;
  }

  static async postScene(sceneData: Partial<Scene>) {
    const response = await axiosInstance.post('/scene', sceneData);
    return response.data;
  }

  static async getScene(sceneId: string) {
    const response = await axiosInstance.get<Scene>(`/scene/${sceneId}`);
    return response.data;
  }
}
