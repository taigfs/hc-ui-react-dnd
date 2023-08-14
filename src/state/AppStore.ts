import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Project } from "../interfaces/Project";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";
import { Tab } from "../interfaces/Tab";

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  currentScene: Scene | Partial<Scene> | null;
  currentStory: Story | Partial<Story> | null;
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project) => void;
  setCurrentScene: (scene: Scene) => void;
  setCurrentStory: (story: Story) => void;
  tabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  setActiveTab: (tab: Tab) => void;
  closeTab: (tab: Tab) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      currentScene: null,
      currentStory: null,
      addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      setProjects: (projects: Project[]) => set(() => ({ projects })),
      setCurrentProject: (project: Project) =>
        set(() => {
          const currentStory = project.stories?.[0] || null;
          return { currentProject: project, currentStory };
        }),
      setCurrentScene: (scene: Scene) =>
        set(() => ({ currentScene: scene })),
      setCurrentStory: (story: Story) =>
        set(() => ({ currentStory: story })),
      tabs: [],
      activeTab: null,
      addTab: (tab: Tab) => set((state) => {
        const existingTab = state.tabs.find(t => t.type === tab.type && t.data.id === tab.data.id);
        if (existingTab) {
          return { activeTab: existingTab };
        }
        return { tabs: [...state.tabs, tab], activeTab: tab };
      }),
      setActiveTab: (tab: Tab) => set(() => ({ activeTab: tab })),
      closeTab: (tab: Tab) => set((state) => {
        const newTabs = state.tabs.filter(t => !(t.type === tab.type && t.data.id === tab.data.id));
        const newActiveTab = newTabs[newTabs.length - 1] || null;
        
        return { tabs: newTabs, activeTab: newActiveTab };
      }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
