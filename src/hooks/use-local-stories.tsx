import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { Story } from '../interfaces/Story';
import { AgentInstance } from '../interfaces/AgentInstance';
import { useLocalNodes } from './use-local-nodes';
import { generateDefaultNodes } from '../utils/generate-default-nodes';

interface StoriesContextProps {
  stories: Story[];
  agents: AgentInstance[];
  get: (id: string) => Promise<Story | undefined>;
  getAll: (projectId: string) => void;
  create: (story: Story) => Promise<void>;
  getAllAgents: (storyId: string) => Promise<AgentInstance[] | undefined>;
}

const StoriesContext = createContext<StoriesContextProps | undefined>(undefined);

export function StoriesProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [agents, setAgents] = useState<AgentInstance[]>([]);
  const { create: createNode } = useLocalNodes();

  const get = async (id: string) => {
    try {
      const story = await db.stories.where('id').equals(id).first();
      return story;
    } catch (error) {
      console.error('Erro ao buscar história por ID:', error);
      throw error;
    }
  };

  const getAll = async (projectId: string) => {
    try {
      const allStories = await db.stories.where('projectId').equals(projectId).toArray();
      setStories(allStories);
    } catch (error) {
      console.error('Erro ao buscar todas as histórias:', error);
    }
  };

  const getAllAgents = async (storyId: string) => {
    try {
      const allAgents = await db.agents.where('storyId').equals(storyId).toArray();
      setAgents(allAgents);
      return allAgents;
    } catch (error) {
      console.error('Erro ao buscar todos os agentes:', error);
    }
  }

  const create = async (story: Story) => {
    try {
      const storyIndex = await db.stories.add(story);
      const createdStory = await db.stories.get(storyIndex);
      if (createdStory?.id) {
        generateDefaultNodes(createdStory.id).forEach(async (node) => {
          await createNode(node);
        });
        if (story.projectId) { getAll(story.projectId); }
      }

    } catch (error) {
      console.error('Erro ao criar história:', error);
      throw error;
    }
  };

  return (
    <StoriesContext.Provider value={{ stories, agents, get, getAll, create, getAllAgents }}>
      {children}
    </StoriesContext.Provider>
  );
}

export default function useLocalStories() {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error('useLocalStories must be used within a StoriesProvider');
  }
  return context;
}