import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { SceneService } from '../services/scene.service';
import { Scene } from '../interfaces/Scene';

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

export interface MapAssetInstanceDTO {
  data: {
    x: number;
    y: number;
  };
  mapAssetSprite: {
    connect: {
      id: number;
    };
  };
  scene: {
    connect: {
      id: number;
    };
  };
}

export function usePostMapAssetInstance() {
  return useMutation((mapAssetInstanceData: MapAssetInstanceDTO) =>
    axios.post('/map-asset-instance', mapAssetInstanceData)
  );
}
