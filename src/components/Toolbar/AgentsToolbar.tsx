import React from 'react';
import { agentAssets } from '../../enum/AgentAssets';
import { AgentButton } from '../Agent';
import { ButtonsContainer, StyledToolbarButton, ToolbarContainer } from './styles';

export const AgentsToolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <h4>Agents</h4>
      <ButtonsContainer>
        { agentAssets.map((key) => {
          return (
            <StyledToolbarButton key={key}>
              <AgentButton sprite={`${key}`} />
            </StyledToolbarButton>
          );
        })}
      </ButtonsContainer>
    </ToolbarContainer>
  );
}