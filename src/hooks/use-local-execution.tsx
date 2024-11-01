import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { ExecutionLog } from '../types/execution-log.type';
import { useLocalNodes } from './use-local-nodes';
import { NodeType } from '../types/node.type';
import { NodeInstance } from '../interfaces/NodeInstance';
import { useLocalEdges } from './use-local-edges';

interface ExecutionContextProps {
  executionLogs: ExecutionLog[];
  currentExecutionLogs: ExecutionLog[];
  clearCurrentExecutionLogs: () => void;
  get: (id: string) => Promise<ExecutionLog | undefined>;
  getAll: (storyId: string) => void;
  create: (executionLog: ExecutionLog) => Promise<void>;
  createMany: (executionLogs: ExecutionLog[]) => Promise<void>;
  update: (executionLog: ExecutionLog) => Promise<void>;
  executeStory: (storyId: string) => Promise<void>;
}

const ExecutionContext = createContext<ExecutionContextProps | undefined>(undefined);

export function ExecutionProvider({ children }: { children: ReactNode }) {
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [currentExecutionLogs, setCurrentExecutionLogs] = useState<ExecutionLog[]>([]);
  const { nodes } = useLocalNodes();
  const { edges } = useLocalEdges();

  const get = async (id: string) => {
    try {
      const executionLog = await db.executionLogs.where('id').equals(id).first();
      return executionLog;
    } catch (error) {
      console.error('Error fetching execution log by ID:', error);
      throw error;
    }
  };

  const getAll = async (storyId: string) => {
    try {
      const allExecutionLogs = await db.executionLogs.where('storyId').equals(storyId).toArray();
      setExecutionLogs(allExecutionLogs);
    } catch (error) {
      console.error('Error fetching all execution logs:', error);
    }
  };

  const create = async (executionLog: ExecutionLog) => {
    try {
      await db.executionLogs.add(executionLog);
    } catch (error) {
      console.error('Error creating execution log:', error);
      throw error;
    }
  };

  const update = async (executionLog: ExecutionLog) => {
    if (!executionLog.id) {
      throw new Error('Execution log id is required');
    }
  
    try {
      const key = await db.executionLogs.where('id').equals(executionLog.id).primaryKeys();
  
      if (!key.length) {
        throw new Error('Execution log key not found');
      }
  
      await db.executionLogs.update(key[0], executionLog);
    } catch (error) {
      console.error('Error updating execution log:', error);
      throw error;
    }
  };

  const executeStory = async (storyId: string) => {
    setCurrentExecutionLogs([]);

    const startNode = nodes.find((node) => node.type === 'start-event');
    if (!startNode) {
      throw new Error('No start-event node found');
    }

    const executionId = new Date().getTime();
    let currentNode: NodeInstance | null = startNode;

    const curExecutionLogs = [];

        while (currentNode) {
            if (!currentNode.id) {
        throw new Error('No node id found');
      }

      const executionLog: ExecutionLog = {
        executionId: executionId.toString(),
        nodeId: currentNode.id,
        nodeType: currentNode.type as NodeType,
        storyId: storyId,
        status: 'success',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };

      if (currentNode.data) {
        executionLog.inputData = (currentNode.data as any)?.actionData;
      }

      if (
        currentNode.type !== 'start-event' 
        // currentNode.type !== 'end-event'
      ) {
        // wait 1000ms
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Find the edge that starts from the current node
      const edgeFromCurrentNode = edges.find(edge => edge.sourceNodeId === currentNode?.id);
      if (edgeFromCurrentNode) {
          const nextNodeId = edgeFromCurrentNode.targetNodeId;
          if (!nextNodeId) {
              throw new Error('No target node found');
          }
          currentNode = nodes.find((node) => node.id === nextNodeId) || null;
      } else {
          currentNode = null;
      }

      curExecutionLogs.push(executionLog);
      setCurrentExecutionLogs([...curExecutionLogs]);
    }

    await createMany(curExecutionLogs);
  };

  const createMany = async (executionLogs: ExecutionLog[]) => {
    try {
      await db.executionLogs.bulkAdd(executionLogs);
    } catch (error) {
      console.error('Error creating multiple execution logs:', error);
      throw error;
    }
  };

  const clearCurrentExecutionLogs = () => {
    setCurrentExecutionLogs([]);
  };

  return (
    <ExecutionContext.Provider value={{ executionLogs, currentExecutionLogs, get, getAll, create, update, executeStory, createMany, clearCurrentExecutionLogs }}>
      {children}
    </ExecutionContext.Provider>
  );
}

export function useLocalExecution() {
  const context = useContext(ExecutionContext);
  if (!context) {
    throw new Error('useLocalExecution must be used within a ExecutionProvider');
  }
  return context;
}
