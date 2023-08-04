import { create } from "zustand";

import { Project } from "../interfaces/Project";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";

interface AppState {
  projects: Project[];
  scenes: Scene[];
  stories: Story[];
  currentProject: Project | null;
  addScene: (scene: Scene) => void;
  addStory: (story: Story) => void;
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project) => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  scenes: [
    { name: "Scene 1", lastUpdate: "2021-01-01", id: 1 },
    { name: "Scene 2", lastUpdate: "2021-01-01", id: 2 },
    { name: "Scene 3", lastUpdate: "2021-01-01", id: 3 },
  ],
  stories: [
    {
      name: "Story 1",
      scene: { name: "Scene 1" },
      lastUpdate: "2021-01-01",
      id: 1,
    },
    {
      name: "Story 2",
      scene: { name: "Scene 1" },
      lastUpdate: "2021-01-01",
      id: 2,
    },
    {
      name: "Story 3",
      scene: { name: "Scene 2" },
      lastUpdate: "2021-01-01",
      id: 3,
    },
  ],
  currentProject: null,
  addScene: (scene: Scene) =>
    set((state) => ({ scenes: [...state.scenes, scene] })),
  addStory: (story: Story) =>
    set((state) => ({ stories: [...state.stories, story] })),
  addProject: (project: Project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  setProjects: (projects: Project[]) =>
    set((state) => ({ projects })),
  setCurrentProject: (project: Project) =>
    set((state) => ({ currentProject: project })),
}));
