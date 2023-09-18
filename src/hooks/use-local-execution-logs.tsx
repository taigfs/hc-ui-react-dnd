import React, { createContext, useContext, useState, ReactNode } from 'react';
import db from "../dexie/database";
import { ExecutionLog } from '../types/execution-log.type';

interface ExecutionLogsContextProps {
  executionLogs: ExecutionLog[];
  get: (id: string) => Promise<ExecutionLog | undefined>;
  getAll: (storyId: string) => void;
  create: (executionLog: ExecutionLog) => Promise<void>;
  update: (executionLog: ExecutionLog) => Promise<void>;
}

const ExecutionLogsContext = createContext<ExecutionLogsContextProps | undefined>(undefined);

export function ExecutionLogsProvider({ children }: { children: ReactNode }) {
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

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

  return (
    <ExecutionLogsContext.Provider value={{ executionLogs, get, getAll, create, update }}>
      {children}
    </ExecutionLogsContext.Provider>
  );
}

export function useLocalExecutionLogs() {
  const context = useContext(ExecutionLogsContext);
  if (!context) {
    throw new Error('useLocalExecutionLogs must be used within a ExecutionLogsProvider');
  }
  return context;
}
