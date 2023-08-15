import React from "react";
import styled from "styled-components";
import { useBoardStore } from "../state/BoardStore";

interface AgentImageProps {
  sprite: string;
}
export const AgentImage: React.FC<AgentImageProps> = ({ sprite }) => {
  const getAgentSpriteById  = useBoardStore((state) => state.getAgentSpriteById);
  const agentSprite = getAgentSpriteById(Number(sprite));

  if (!agentSprite) { 
    return null; 
  }

  const { isAtlas, path: url } = agentSprite;

  if (isAtlas) {
    return (
      <AtlasImgContainer>
        <img src={url} alt="Agent" />
      </AtlasImgContainer>
    );
  }
  return <img src={url} alt="Agent" />;
};

const AtlasImgContainer = styled.div`
  width: calc(130px / 4);
  height: calc(192px / 4);
  overflow: hidden;
`;
