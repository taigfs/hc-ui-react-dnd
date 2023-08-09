import { useQuery } from 'react-query';
import axiosInstance from '../services/api';
import { Scene } from '../interfaces/Scene';

export function useGetScenes(projectId: number) {
  return useQuery('scenes', async () => {
    const response = await axiosInstance.get<Scene[]>(`/scene?projectId=${projectId}`);
    return response.data;
  });
}
