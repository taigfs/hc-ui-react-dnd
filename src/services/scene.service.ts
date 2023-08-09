import { Scene } from '../interfaces/Scene';
import axiosInstance from '../services/api';

export abstract class SceneService {
  static async getScenes(projectId: number) {
    const response = await axiosInstance.get<Scene[]>(`/scene?projectId=${projectId}`);
    return response.data;
  }

  static async postScene(sceneData: Scene) {
    const response = await axiosInstance.post('/scene', sceneData);
    return response.data;
  }
}
