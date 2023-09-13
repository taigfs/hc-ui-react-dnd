import { useState } from 'react';
import db from "../dexie/database";
import { Story } from '../interfaces/Story';
import { AgentInstance } from '../interfaces/AgentInstance';

function useLocalStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [agents, setAgents] = useState<AgentInstance[]>([]);

  // Método para buscar uma história por ID
  const get = async (id: string) => {
    try {
      const story = await db.stories.where('id').equals(id).first();
      return story;
    } catch (error) {
      console.error('Erro ao buscar história por ID:', error);
      throw error;
    }
  };

  // Método para buscar todas as histórias de um projeto
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

  // Método para criar uma nova história
  const create = async (story: Story) => {
    try {
      await db.stories.add(story);
    } catch (error) {
      console.error('Erro ao criar história:', error);
      throw error;
    }
  };

  return {
    stories,
    agents,
    get,
    getAll,
    create,
    getAllAgents
  };
}

export default useLocalStories;
