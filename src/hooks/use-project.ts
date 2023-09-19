import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { ProjectService } from "../services/project.service";
import { useQuery } from "react-query";
import { AgentSpriteService } from "../services/agent-sprite.service";

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
