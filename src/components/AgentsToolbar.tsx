import React from 'react';
import styled from 'styled-components';
import { AgentButton } from './Agent';
import { ToolbarButton } from './ToolbarButton';

export const AgentsToolbar: React.FC = () => {
  return (
    <Container>
      <h4>Agents</h4>
      <ButtonsContainer>
        <StyledToolbarButton>
          <AgentButton />
        </StyledToolbarButton>
        <StyledToolbarButton />
        <StyledToolbarButton />
        <StyledToolbarButton />
        <StyledToolbarButton />
        <StyledToolbarButton />
        <StyledToolbarButton />
        <StyledToolbarButton />
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.color.squareBorder};
  width: 300px;
  border-radius: 5px;
  padding: 16px 16px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text};
`;

const ButtonsContainer = styled.div`
  padding-top: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledToolbarButton = styled(ToolbarButton)`
  margin-right: 6px;
  margin-bottom: 6px;
`;