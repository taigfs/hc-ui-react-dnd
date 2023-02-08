import React from 'react';
import { AgentSprite } from '../enum';

interface AgentImageProps {
  sprite: string;
}
export const AgentImage: React.FC<AgentImageProps> = ({ sprite }) => {
  return (
    <img src={sprite} alt="Agent" />
  );
}