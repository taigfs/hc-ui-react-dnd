import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SceneService } from '../services/scene.service';
import { Scene } from '../interfaces/Scene';
import { MapAssetInstanceDTO } from '../dtos/patch-map-asset-instance-dto';
import { MapAssetSpriteService } from '../services/map-asset-sprite.service';
import { useContext } from 'react';
import { SocketContext } from '../providers/socket-provider';

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
  return useQuery(['scene', sceneId], async () => SceneService.getScene(sceneId));
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

export function useGetMapAssetSprites() {
  return useQuery('mapAssetSprites', async () => MapAssetSpriteService.getMapAssetSprites(), {
    // donot refresh after first load
    staleTime: Infinity
  });
}
