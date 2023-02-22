import React from "react";
import styled from "styled-components";

import { getAgentAssetSpritePath } from "../enum/AgentAssets";

interface AgentImageProps {
  sprite: string;
  isAtlas?: boolean;
}
export const AgentImage: React.FC<AgentImageProps> = ({ sprite, isAtlas }) => {
  const url = getAgentAssetSpritePath(sprite);
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
