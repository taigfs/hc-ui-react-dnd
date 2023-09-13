import { useState } from 'react';
import db from "../dexie/database";
import { AgentInstance } from '../interfaces/AgentInstance';

function useLocalAgents() {
  const [agents, setAgents] = useState<AgentInstance[]>([]);

  // Método para buscar um agente por ID
  const get = async (id: string) => {
    try {
      const agent = await db.agents.where('id').equals(id).first();
      return agent;
    } catch (error) {
      console.error('Erro ao buscar agente por ID:', error);
      throw error;
    }
  };

  // Método para buscar todos os agentes de um projeto
  const getAll = async (projectId: string) => {
    try {
      const allAgents = await db.agents.where('projectId').equals(projectId).toArray();
      setAgents(allAgents);
    } catch (error) {
      console.error('Erro ao buscar todos os agentes:', error);
    }
  };

  // Método para criar um novo agente
  const create = async (agent: AgentInstance) => {
    try {
      await db.agents.add(agent);
    } catch (error) {
      console.error('Erro ao criar agente:', error);
      throw error;
    }
  };

  return {
    agents,
    get,
    getAll,
    create,
  };
}

export default useLocalAgents;
