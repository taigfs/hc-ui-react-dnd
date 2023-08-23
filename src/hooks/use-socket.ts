// useSocket.ts
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { useDiagramStore } from '../state/DiagramStore';
import { NodeInstance } from '../interfaces/NodeInstance';
import { getDiagramNodeId } from '../utils/get-diagram-node-id';

function useSocket(serverUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
  const { updateNodeId } = useDiagramStore((s) => s);

  useEffect(() => {
    const socketIo = io(serverUrl);
    
    // on any message, console log it
    socketIo.onAny((event, ...args) => {
      console.log(event, args);
    });

    socketIo.on('nodeCreated', (node: NodeInstance) => {
      updateNodeId(node.data?.tempId, getDiagramNodeId(node.id.toString()));
      // queryClient.invalidateQueries('story');
    });
    
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
}

export default useSocket;
