import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from '../dexie/database';
import { AgentInstance } from '../interfaces/AgentInstance';

interface AgentsContextProps {
  agents: AgentInstance[];
  get: (id: string) => Promise<AgentInstance | undefined>;
  update: (agent: AgentInstance) => Promise<void>;
  getAll: (storyId: string) => void;
  create: (agent: AgentInstance) => Promise<void>;
  update: (agent: AgentInstance) => Promise<void>;
}

const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<AgentInstance[]>([]);

  // Métodos para buscar um agente por ID, buscar todos os agentes e criar um novo agente
  const get = async (id: string) => {
    try {
      const agent = await db.agents.where('id').equals(id).first();
      return agent;
    } catch (error) {
      console.error('Erro ao buscar agente por ID:', error);
      throw error;
    }
  };

  const getAll = async (storyId: string) => {
    try {
      const allAgents = await db.agents.where('storyId').equals(storyId).toArray();
      setAgents(allAgents);
    } catch (error) {
      console.error('Erro ao buscar todos os agentes:', error);
    }
  };

  const create = async (agent: AgentInstance) => {
    try {
      await db.agents.add(agent);
      // Atualize a lista de agentes após a criação
      getAll(agent.storyId);
    } catch (error) {
      console.error('Erro ao criar agente:', error);
      throw error;
    }
  };

  const update = async (agent: AgentInstance) => {
    if (!agent.id) {
      throw new Error('Agent id is required');
    }
  
    try {
      const key = await db.agents.where('id').equals(agent.id).primaryKeys();
  
      if (!key.length) {
        throw new Error('Agent key not found');
      }
  
      await db.agents.update(key[0], agent);
      getAll(agent.storyId);
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  };
  

  return (
    <AgentsContext.Provider value={{ agents, get, getAll, create, update }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useLocalAgents() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error('useLocalAgents deve ser usado dentro de AgentsProvider');
  }
  return context;
}
