import React from 'react';
import styled from 'styled-components';

interface ToolbarButtonProps {
  className?: string;
  children?: React.ReactElement;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ className, children }) => {
  return (
    <Container className={className}>
      { children || 'B' }
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.color.squareBorder};
  width: ${({ theme }) => theme.squareSize};
  height: ${({ theme }) => theme.squareSize};
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32pt;
`;