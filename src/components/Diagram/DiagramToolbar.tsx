import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useDiagramStore } from '../../state/DiagramStore';
import { NodeType } from '../../types/node.type';
import { Node } from "reactflow";
import { ToolbarContainer } from '../Toolbar/styles';
import { DiagramIcon } from './DiagramIcon';

export const DiagramToolbar: React.FC = () => {
  const { addNode } = useDiagramStore((s) => s);

  function addNodeType (type: NodeType) {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type: type,
      position: {
        x: 200,
        y: 500
      },
      data: {}
    };
    addNode(newNode);
  }

  return (
    <ToolbarContainer>
      <StyledH4>Nodes</StyledH4>
      <ToolbarButton icon={<DiagramIcon name='pre-conditions' />} onClick={() => addNodeType('pre-conditions')} />
      <ToolbarButton icon={<DiagramIcon name='start-event' />} onClick={() => addNodeType('start-event')} />
      <ToolbarButton icon={<DiagramIcon name='add' />} onClick={() => addNodeType('add')} />
      <ToolbarButton icon={<DiagramIcon name='move' />} onClick={() => addNodeType('move')} />
      <ToolbarButton icon={<DiagramIcon name='script' />} onClick={() => addNodeType('script')} />
      <ToolbarButton icon={<DiagramIcon name='timer' />} onClick={() => addNodeType('timer')} />
      <ToolbarButton icon={<DiagramIcon name='end-event' />} onClick={() => addNodeType('end-event')} />
      <ToolbarButton icon={<DiagramIcon name='post-conditions' />} onClick={() => addNodeType('post-conditions')} />
    </ToolbarContainer>
  );
};

const StyledH4 = styled.h4`
  position: sticky;
  top: 0;
  background-color: #151515;
  z-index: 10;
  padding: 8px 0 4px;
`;

const ToolbarButton = styled(Button)`
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: white;
  width: ${({ theme }) => theme.squareSize}!important;
  height: ${({ theme }) => theme.squareSize};
`;