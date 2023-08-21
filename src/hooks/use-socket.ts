// useSocket.ts
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

function useSocket(serverUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socketIo = io(serverUrl);
    
    // on any message, console log it
    socketIo.onAny((event, ...args) => {
      console.log(event, args);
    });

    socketIo.on('nodeCreated', () => queryClient.invalidateQueries('story'));
    
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
}

export default useSocket;
