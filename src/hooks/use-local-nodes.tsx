import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { NodeInstance } from '../interfaces/NodeInstance';

interface NodesContextProps {
  nodes: NodeInstance[];
  get: (id: string) => Promise<NodeInstance | undefined>;
  getAll: (storyId: string) => void;
  create: (node: NodeInstance) => Promise<void>;
}

const NodesContext = createContext<NodesContextProps | undefined>(undefined);

export function NodesProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<NodeInstance[]>([]);

  const get = async (id: string) => {
    try {
      const node = await db.nodes.where('id').equals(id).first();
      return node;
    } catch (error) {
      console.error('Error fetching node by ID:', error);
      throw error;
    }
  };

  const getAll = async (storyId: string) => {
    try {
      const allNodes = await db.nodes.where('storyId').equals(storyId).toArray();
      setNodes(allNodes);
    } catch (error) {
      console.error('Error fetching all nodes:', error);
    }
  };

  const create = async (node: NodeInstance) => {
    try {
      await db.nodes.add(node);
    } catch (error) {
      console.error('Error creating node:', error);
      throw error;
    }
  };

  return (
    <NodesContext.Provider value={{ nodes, get, getAll, create }}>
      {children}
    </NodesContext.Provider>
  );
}

export function useLocalNodes() {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error('useLocalNodes must be used within a NodesProvider');
  }
  return context;
}
