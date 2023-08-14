import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Project } from "../interfaces/Project";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  currentScene: Scene | null; // Added currentScene property
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project) => void;
  setCurrentScene: (scene: Scene) => void; // Added setCurrentScene function
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      currentScene: null, // Initialized currentScene as null
      addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      setProjects: (projects: Project[]) => set(() => ({ projects })),
      setCurrentProject: (project: Project) =>
        set(() => ({ currentProject: project })),
      setCurrentScene: (scene: Scene) => // Added setCurrentScene function
        set(() => ({ currentScene: scene })),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
