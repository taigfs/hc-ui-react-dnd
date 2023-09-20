import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Project } from "../interfaces/Project";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";
import { Tab } from "../interfaces/Tab";
import { AgentClass } from "../types/agent-class.type";

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  currentScene: Scene | Partial<Scene> | null;
  currentStory: Story | Partial<Story> | null;
  currentAgentClass: AgentClass | null;
  addProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setCurrentScene: (scene: Scene | null) => void;
  setCurrentStory: (story: Story | Partial<Story> | null) => void;
  setCurrentAgentClass: (agentClass: AgentClass | null) => void;
  tabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  setActiveTab: (tab: Tab | null) => void;
  setTabs: (tabs: Tab[]) => void;
  closeTab: (tab: Tab) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      currentScene: null,
      currentStory: null,
      currentAgentClass: null,
      addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      setProjects: (projects: Project[]) => set(() => ({ projects })),
      setCurrentProject: (project: Project | null) => set(() => ({ currentProject: project })),
      setCurrentScene: (scene: Scene | null) =>
        set(() => ({ currentScene: scene })),
      setCurrentStory: (story: Story | Partial<Story> | null) =>
        set(() => ({ currentStory: story })),
      setCurrentAgentClass: (agentClass: AgentClass | null) =>
        set(() => ({ currentAgentClass: agentClass })),
      reset: () => set(() => ({
        projects: [],
        currentProject: null,
        currentScene: null,
        currentStory: null,
        currentAgentClass: null,
        tabs: [],
        activeTab: null,
      })),
      tabs: [],
      activeTab: null,
      addTab: (tab: Tab) => set((state) => {
        const existingTab = state.tabs.find(t => t.type === tab.type && t.data.id === tab.data.id);
        if (existingTab) {
          return { activeTab: existingTab };
        }
        return { tabs: [...state.tabs, tab], activeTab: tab };
      }),
      setActiveTab: (tab: Tab | null) => set(() => ({ activeTab: tab })),
      setTabs: (tabs: Tab[]) => set(() => ({ tabs })),
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
