// useSocket.ts
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { useDiagramStore } from '../state/DiagramStore';
import { NodeInstance } from '../interfaces/NodeInstance';
import { getDiagramNodeId } from '../utils/get-diagram-node-id';
import { ExecutionLog } from '../types/execution-log.type';
import { useExecutionStore } from '../state/ExecutionStore';

function useSocket(serverUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { addMessage, clearMessages } = useExecutionStore((s) => s);
  const { updateNodeId } = useDiagramStore((s) => s);

  useEffect(() => {
    const socketIo = io(serverUrl);
    
    // on any message, console log it
    socketIo.onAny((event, ...args) => {
      console.log(event, args);
    });

    socketIo.on('nodeExecuted', (executionLog: ExecutionLog) => {
      addMessage(executionLog);
    });

    socketIo.on('storyExecutionStarted', (storyId: number) => {
      clearMessages();
    });

    socketIo.on('storyExecutionFinished', (storyId: number) => {
      console.log('storyExecutionFinished', storyId);
    });
    
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
}

export default useSocket;
