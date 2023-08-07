import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Project } from "../interfaces/Project";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      setProjects: (projects: Project[]) => set(() => ({ projects })),
      setCurrentProject: (project: Project) =>
        set(() => ({ currentProject: project })),
    }),
    {
      name: "app-storage", // nome do armazenamento
      storage: createJSONStorage(() => sessionStorage), // usando sessionStorage
    }
  )
);
