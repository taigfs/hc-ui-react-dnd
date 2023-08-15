import React from "react";
import styled from "styled-components";
import { useBoardStore } from "../state/BoardStore";

interface AgentImageProps {
  sprite: string;
  isAtlas?: boolean;
}
export const AgentImage: React.FC<AgentImageProps> = ({ sprite, isAtlas }) => {
  const getAgentSpritePath = useBoardStore((state) => state.getAgentSpritePath);
  const url = getAgentSpritePath(Number(sprite));
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
