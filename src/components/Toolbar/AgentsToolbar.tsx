import React from "react";

import {
  ButtonsContainer,
  StyledToolbarButton,
  ToolbarContainer,
} from "./styles";
import { agentAssets } from "../../enum/AgentAssets";
import { AgentButton } from "../Agent";

export const AgentsToolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <h4>Agents</h4>
      <ButtonsContainer>
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
