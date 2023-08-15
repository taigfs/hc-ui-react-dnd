import React, { useEffect } from "react";

import {
  ButtonsContainer,
  StyledToolbarButton,
  ToolbarContainer,
} from "./styles";
import { AgentButton } from "../Agent";
import styled from "styled-components";
import { useGetAgentSprites } from "../../hooks/use-story";
import { useBoardStore } from "../../state/BoardStore";
import { AgentSprite } from "../../interfaces/AgentSprite";

export const AgentsToolbar: React.FC = () => {
  const { data: agentSprites } = useGetAgentSprites();
  const setAgentSprites = useBoardStore((state) => state.setAgentSprites);

  useEffect(() => {
    if (agentSprites) {
      const sprites: Record<number, AgentSprite> = {};
      agentSprites.forEach((agentSprite) => {
        sprites[agentSprite.id] = agentSprite;
      });
      setAgentSprites(sprites);
    }
  }, [agentSprites]);

  return (
    <ToolbarContainer>
      <StyledH4>Agents</StyledH4>
      <ButtonsContainer>
        {agentSprites?.map((agentSprite) => {
          return (
            <StyledToolbarButton key={agentSprite.id}>
              <AgentButton sprite={`${agentSprite.id}`} />
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
