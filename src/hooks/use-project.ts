import { ProjectService } from "../services/project.service";
import { useMutation, useQuery } from "react-query";
import { AgentSpriteService } from "../services/agent-sprite.service";
import { MapAssetSpriteService } from "../services/map-asset-sprite.service";
import { GeneratedSceneData } from "../types/generated-scene-data.type";
import { useAppStore } from "../state/AppStore";
import { GenerateSceneDto } from "../dtos/generate-scene-dto";

export function useProject(projectId: number) {
  return useQuery(['project', projectId], async () => ProjectService.getProject(projectId), {
    staleTime: 30,
    enabled: projectId !== 0
  });
}

export function useGetAgentSprites() {
  return useQuery('agentSprites', async () => AgentSpriteService.getAgentSprites(), {
    // donot refresh after first load
    staleTime: Infinity,
  });
}

export function useGetMapAssetSprites() {
  return useQuery('mapAssetSprites', async () => MapAssetSpriteService.getMapAssetSprites(), {
    // donot refresh after first load
    staleTime: Infinity
  });
}

export function useGenerateScene (callback: (data: GeneratedSceneData) => void) {
  const { setGenerating, addMessage } = useAppStore((state) => state);
  return useMutation(MapAssetSpriteService.generateScene, {
    onMutate: (dto: GenerateSceneDto) => {
      addMessage({
        text: dto.inputText,
        createdAt: new Date().toISOString(),
      })
      setGenerating('scene');
    },
    onSuccess: (data) => {
      setGenerating(false);
      callback(data);
      addMessage({ text: data.reasoning || `Generated scene`, createdAt: new Date().toISOString() });
    },
    onError: () => setGenerating(false),
  });
}
