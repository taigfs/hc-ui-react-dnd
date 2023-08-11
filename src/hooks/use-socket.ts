// useSocket.ts
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

function useSocket(serverUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(serverUrl);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
}

export default useSocket;