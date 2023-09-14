import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { EdgeInstance } from '../interfaces/EdgeInstance';

interface EdgesContextProps {
  edges: EdgeInstance[];
  get: (id: number) => Promise<EdgeInstance | undefined>;
  getAll: (storyId: number) => void;
  create: (edge: EdgeInstance) => Promise<void>;
}

const EdgesContext = createContext<EdgesContextProps | undefined>(undefined);

export function EdgesProvider({ children }: { children: ReactNode }) {
  const [edges, setEdges] = useState<EdgeInstance[]>([]);

  const get = async (id: number) => {
    try {
      const edge = await db.edges.where('id').equals(id).first();
      return edge;
    } catch (error) {
      console.error('Error fetching edge by ID:', error);
      throw error;
    }
  };

  const getAll = async (storyId: number) => {
    try {
      const allEdges = await db.edges.where('storyId').equals(storyId).toArray();
      setEdges(allEdges);
    } catch (error) {
      console.error('Error fetching all edges:', error);
    }
  };

  const create = async (edge: EdgeInstance) => {
    try {
      await db.edges.add(edge);
    } catch (error) {
      console.error('Error creating edge:', error);
      throw error;
    }
  };

  return (
    <EdgesContext.Provider value={{ edges, get, getAll, create }}>
      {children}
    </EdgesContext.Provider>
  );
}

export function useLocalEdges() {
  const context = useContext(EdgesContext);
  if (!context) {
    throw new Error('useLocalEdges must be used within a EdgesProvider');
  }
  return context;
}
