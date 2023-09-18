import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { NodeInstance } from '../interfaces/NodeInstance';

interface NodesContextProps {
  nodes: NodeInstance[];
  get: (id: string) => Promise<NodeInstance | undefined>;
  getAll: (storyId: string) => void;
  create: (node: NodeInstance) => Promise<void>;
  update: (node: NodeInstance) => Promise<void>;
  updateXY: (id: string, x: number, y: number) => Promise<void>;
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

  const update = async (node: NodeInstance) => {
    if (!node.id) {
      throw new Error('Node id is required');
    }
  
    try {
      const key = await db.nodes.where('id').equals(node.id).primaryKeys();
  
      if (!key.length) {
        throw new Error('Node key not found');
      }
  
      await db.nodes.update(key[0], node);
    } catch (error) {
      console.error('Error updating node:', error);
      throw error;
    }
  };

  const updateXY = async (id: string, x: number, y: number) => {
    const node = await get(id);
    if (!node) {
      throw new Error('Node not found');
    }

    await update({
      ...node,
      x,
      y,
    });
  }
  

  return (
    <NodesContext.Provider value={{ nodes, get, getAll, create, update, updateXY }}>
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
