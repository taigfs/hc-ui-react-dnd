import React, { createContext, useContext, useState, ReactNode } from "react";
import db from "../dexie/database";
import { EdgeInstance } from "../interfaces/EdgeInstance";

interface EdgesContextProps {
  edges: EdgeInstance[];
  get: (id: string) => Promise<EdgeInstance | undefined>;
  getAll: (storyId: string) => void;
  create: (edge: EdgeInstance) => Promise<void>;
  reset: () => void;
}

const EdgesContext = createContext<EdgesContextProps | undefined>(undefined);

export function EdgesProvider({ children }: { children: ReactNode }) {
  const [edges, setEdges] = useState<EdgeInstance[]>([]);
  
  const reset = () => {
    setEdges([]);
  };

  const get = async (id: string) => {
    try {
      const edge = await db.edges.where("id").equals(id).first();
      return edge;
    } catch (error) {
      console.error("Error fetching edge by ID:", error);
      throw error;
    }
  };

  const getAll = async (storyId: string) => {
    try {
      // Fetch all nodes within the story
      const nodes = await db.nodes.where("storyId").equals(storyId).toArray();

      // Extract node IDs
      const nodeIds = nodes.map((node) => node.id) as string[];

      // Fetch all edges related to the extracted node IDs
      const allEdges = await db.edges
        .where("sourceNodeId")
        .anyOf(nodeIds)
        .or("targetNodeId")
        .anyOf(nodeIds)
        .toArray();

      setEdges(allEdges);
    } catch (error) {
      console.error("Error fetching all edges:", error);
    }
  };

  const create = async (edge: EdgeInstance) => {
    try {
      await db.edges.add(edge);
    } catch (error) {
      console.error("Error creating edge:", error);
      throw error;
    }
  };

  return (
    <EdgesContext.Provider value={{ edges, get, getAll, create, reset }}>
      {children}
    </EdgesContext.Provider>
  );
}

export function useLocalEdges() {
  const context = useContext(EdgesContext);
  if (!context) {
    throw new Error("useLocalEdges must be used within a EdgesProvider");
  }
  return context;
}
