import React from 'react';
import { getAgentAssetSpritePath } from '../enum/AgentAssets';

interface AgentImageProps {
  sprite: string;
}
export const AgentImage: React.FC<AgentImageProps> = ({ sprite }) => {
  const url = getAgentAssetSpritePath(sprite);
  return (
    <img src={url} alt="Agent" />
  );
}