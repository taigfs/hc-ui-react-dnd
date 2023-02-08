import React from 'react';
import styled from 'styled-components';
import { AgentSprite } from '../../enum';
import { AgentButton } from '../Agent';
import { ButtonsContainer, StyledToolbarButton, ToolbarContainer } from './styles';
import { ToolbarButton } from './ToolbarButton';

export const AgentsToolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <h4>Agents</h4>
      <ButtonsContainer>
        { Object.keys(AgentSprite).map((key) => {
          const sprite: AgentSprite = AgentSprite[key as keyof typeof AgentSprite];
          return (
            <StyledToolbarButton key={key}>
              <AgentButton sprite={sprite} />
            </StyledToolbarButton>
          );
        })}
      </ButtonsContainer>
    </ToolbarContainer>
  );
}