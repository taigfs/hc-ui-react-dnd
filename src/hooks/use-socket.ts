// useSocket.ts
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { useDiagramStore } from '../state/DiagramStore';
import { ExecutionLog } from '../types/execution-log.type';

function useSocket(serverUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { updateNodeId } = useDiagramStore((s) => s);

  useEffect(() => {
    const socketIo = io(serverUrl);
    
    // on any message, console log it
    socketIo.onAny((event, ...args) => {
      console.log(event, args);
    });
    
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
}

export default useSocket;
