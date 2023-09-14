import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from '../dexie/database';
import { AgentInstance } from '../interfaces/AgentInstance';
import { useLocalAgentClasses } from './use-local-agent-classes';

interface AgentsContextProps {
  agents: AgentInstance[];
  get: (id: string) => Promise<AgentInstance | undefined>;
  update: (agent: AgentInstance) => Promise<void>;
  getAll: (storyId: string) => void;
  create: (agent: AgentInstance, projectId: string) => Promise<void>;
  canMoveAgent: (x: number, y: number) => boolean;
}

const AgentsContext = createContext<AgentsContextProps | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<AgentInstance[]>([]);
  const { createDefault: createDefaultAgentClass } = useLocalAgentClasses();

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

  const create = async (agent: AgentInstance, projectId: string) => {
    try {
      const agentClassIndex = await createDefaultAgentClass(projectId);
      const agentClass = await db.agentClasses.get(agentClassIndex);

      if (!agentClass) {
        throw new Error('Agent class not found');
      }
      
      await db.agents.add({
        ...agent,
        agentClassId: agentClass.id,
      });
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
  
  const canMoveAgent = (x: number, y: Number) => {
    return !agents.some((agent) => agent.data.x === x && agent.data.y === y);
  };

  return (
    <AgentsContext.Provider value={{ agents, get, getAll, create, update, canMoveAgent }}>
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
