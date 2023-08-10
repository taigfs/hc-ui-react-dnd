import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SceneService } from '../services/scene.service';
import { Scene } from '../interfaces/Scene';
import { postMapAssetInstance } from '../services/map-asset-instance.service';

export function useGetScenes(projectId: number) {
  return useQuery('scenes', async () => SceneService.getScenes(projectId));
}

export function usePostScene() {
  const queryClient = useQueryClient();
  return useMutation((sceneData: Partial<Scene>) => SceneService.postScene(sceneData), {
    onSuccess: () => {
      queryClient.invalidateQueries('scenes');
    }
  });
}

export function useGetScene(sceneId: number) {
  return useQuery('scene', async () => SceneService.getScene(sceneId));
}

export function usePostMapAssetInstance() {
  return useMutation((mapAssetInstanceData: MapAssetInstanceDTO) =>
    postMapAssetInstance(mapAssetInstanceData)
  );
}
