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

export const AgentsToolbar: React.FC = () => {
  const { data: agentSprites } = useGetAgentSprites();
  console.log(agentSprites);

  return (
    <ToolbarContainer>
      <StyledH4>Agents</StyledH4>
      <ButtonsContainer>
        {agentAssetsAtlas.map((key) => {
          return (
            <StyledToolbarButton key={key}>
              <AgentButton sprite={`${key}`} isAtlas />
            </StyledToolbarButton>
          );
        })}
        {agentAssets.map((key) => {
          return (
            <StyledToolbarButton key={key}>
              <AgentButton sprite={`${key}`} />
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
`