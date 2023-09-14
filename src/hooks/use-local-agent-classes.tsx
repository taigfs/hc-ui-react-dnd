import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from '../dexie/database';
import { AgentClass } from '../types/agent-class.type';

interface AgentClassesContextProps {
  agentClasses: AgentClass[];
  get: (id: string) => Promise<AgentClass | undefined>;
  update: (agentClass: AgentClass) => Promise<void>;
  getAll: (projectId: string) => void;
  create: (agentClass: AgentClass) => Promise<number>;
  createDefault: (projectId: string) => Promise<number>;
}

const AgentClassesContext = createContext<AgentClassesContextProps | undefined>(undefined);

export function AgentClassesProvider({ children }: { children: ReactNode }) {
  const [agentClasses, setAgentClasses] = useState<AgentClass[]>([]);

  // Métodos para buscar um agentClass por ID, buscar todos os agentClasses e criar um novo agentClass
  const get = async (id: string) => {
    try {
      const agentClass = await db.agentClasses.where('id').equals(id).first();
      return agentClass;
    } catch (error) {
      console.error('Erro ao buscar agentClass por ID:', error);
      throw error;
    }
  };

  const getAll = async (projectId: string) => {
    try {
      const allAgentClasses = await db.agentClasses.where('projectId').equals(projectId).toArray();
      setAgentClasses(allAgentClasses);
    } catch (error) {
      console.error('Erro ao buscar todos os agentClasses:', error);
    }
  };

  const create = async (agentClass: AgentClass) => {
    try {
      const ac = await db.agentClasses.add(agentClass);
      // Atualize a lista de agentClasses após a criação
      getAll(agentClass.projectId);
      return ac;
    } catch (error) {
      console.error('Erro ao criar agentClass:', error);
      throw error;
    }
  };

  const createDefault = async (projectId: string) => {
    const defaultSchema = {};
    return await create({
      name: 'New Class ' + (agentClasses.length + 1),
      schema: JSON.stringify(defaultSchema),
      projectId,
    });
  };

  const update = async (agentClass: AgentClass) => {
    if (!agentClass.id) {
      throw new Error('AgentClass id is required');
    }
  
    try {
      const key = await db.agentClasses.where('id').equals(agentClass.id).primaryKeys();
  
      if (!key.length) {
        throw new Error('AgentClass key not found');
      }
  
      await db.agentClasses.update(key[0], agentClass);
      getAll(agentClass.projectId);
    } catch (error) {
      console.error('Error updating agentClass:', error);
      throw error;
    }
  };

  return (
    <AgentClassesContext.Provider value={{ agentClasses, get, getAll, create, update, createDefault }}>
      {children}
    </AgentClassesContext.Provider>
  );
}

export function useLocalAgentClasses() {
  const context = useContext(AgentClassesContext);
  if (!context) {
    throw new Error('useLocalAgentClasses deve ser usado dentro de AgentClassesProvider');
  }
  return context;
}
