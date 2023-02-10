import React from 'react';
import styled from 'styled-components';
import { MapAssetSprite } from '../../enum';
import { useBoardStore } from '../../state/store';

interface ToolbarButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactElement;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ className, children, id = null }) => {
  const { activeButton, setActiveButton, setSelectedAgentIndex } = useBoardStore((state) => state);

  const onClick = () => {
    setActiveButton(id);
    setSelectedAgentIndex(null);
  }

  return (
    <Container 
      className={className} 
      onClick={onClick}
      active={activeButton === id && id !== null}>
      { children }
    </Container>
  );
}

interface ContainerProps {
  active: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color.squareBorder};
  width: ${({ theme }) => theme.squareSize};
  height: ${({ theme }) => theme.squareSize};
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32pt;
  ${({ active, theme }) => active ? `border: 4px solid ${theme.color.featuredSquareBorder};` : ``}
`;