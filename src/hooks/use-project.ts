import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { ProjectService } from "../services/project.service";
import { useQuery } from "react-query";

export function useProject(projectId: number) {
  return useQuery(['project', projectId], async () => ProjectService.getProject(projectId), {
    staleTime: 30,
    enabled: projectId !== 0
  });
}
