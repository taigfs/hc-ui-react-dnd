import React from "react";

import {
  ButtonsContainer,
  StyledToolbarButton,
  ToolbarContainer,
} from "./styles";
import { agentAssets, agentAssetsAtlas } from "../../enum/AgentAssets";
import { AgentButton } from "../Agent";
import styled from "styled-components";
import { useGetAgentSprites } from "../../hooks/use-story";
import { useBoardStore } from "../../state/BoardStore";

export const AgentsToolbar: React.FC = () => {
  const { data: agentSprites } = useGetAgentSprites();
  const setAgentSprites = useBoardStore((state) => state.setAgentSprites);

  if (agentSprites) {
    const sprites: Record<number, string> = {};
    agentSprites.forEach((agentSprite) => {
      sprites[agentSprite.id] = agentSprite.path;
    });
    setAgentSprites(sprites);
  }

  return (
    <ToolbarContainer>
      <StyledH4>Agents</StyledH4>
      <ButtonsContainer>
        {agentSprites?.map((agentSprite) => {
          return (
            <StyledToolbarButton key={agentSprite.id}>
              <AgentButton sprite={`${agentSprite.id}`} isAtlas={false} />
            </StyledToolbarButton>
          );
        })}
      </ButtonsContainer>
    </ToolbarContainer>
  );
};

const StyledH4 = styled.h4`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.color.squareBg};
  z-index: 10;
  padding-top: 16px;
  padding-bottom: 8px;
`;
