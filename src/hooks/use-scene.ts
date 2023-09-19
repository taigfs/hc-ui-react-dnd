import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SceneService } from '../services/scene.service';
import { Scene } from '../interfaces/Scene';
import { MapAssetInstanceDTO } from '../dtos/patch-map-asset-instance-dto';
import { MapAssetSpriteService } from '../services/map-asset-sprite.service';
import { useContext } from 'react';
import { SocketContext } from '../providers/socket-provider';

export function useGetScenes(projectId: string) {
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

export function useGetScene(sceneId: string) {
  return useQuery(['scene', sceneId], async () => SceneService.getScene(sceneId), {
    staleTime: 1000 * 60 * 10
  });
}

export function usePostMapAssetInstance() {
  const socket = useContext(SocketContext);

  const emitUpdate = (mapAssetInstanceData: MapAssetInstanceDTO) => {
    console.log('emitting updateMapAssetInstance');
    socket?.emit('updateMapAssetInstance', mapAssetInstanceData);
  };

  return {
    mutate: emitUpdate
  }
}
