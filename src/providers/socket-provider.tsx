import React from 'react';
import useSocket from '../hooks/use-socket';
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

interface SocketProviderProps {
  serverUrl: string;
  children: React.ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ serverUrl, children }: SocketProviderProps) => {
  const socket = useSocket(serverUrl);

  return (
    <SocketContext.Provider value={socket}>
      {children}  
    </SocketContext.Provider>
  )
};

export default SocketProvider;
