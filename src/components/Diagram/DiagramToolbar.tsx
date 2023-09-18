import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useDiagramStore } from '../../state/DiagramStore';
import { NodeType } from '../../types/node.type';
import { Node } from "reactflow";
import { ToolbarContainer } from '../Toolbar/styles';
import { DiagramIcon } from './DiagramIcon';
import { useAppStore } from '../../state/AppStore';
import { useLocalNodes } from '../../hooks/use-local-nodes';

export const DiagramToolbar: React.FC = () => {
  const { addNode } = useDiagramStore((s) => s);
  const storyId = useAppStore((s) => s.currentStory?.id) || 0;
  const { nodes, create: createNode } = useLocalNodes();

  function addNodeType (type: NodeType) {
    const id = crypto.randomUUID();
    const newNode: Node = {
      id,
      type: type,
      position: {
        x: 400,
        y: 250
      },
      data: {
        label: `New node ${nodes.length + 1}`,
        actionData: {}
      },
    };
    addNode(newNode);

    if (!storyId) {
      throw new Error('No story id');
    }

    createNode({
      id,
      type: newNode.type || 'script',
      x: newNode.position.x,
      y: newNode.position.y,
      storyId,
      label: 'New node',
      data: {}
    });
  }

  return (
    <>
      <ToolbarContainer>
        <StyledH4>Events</StyledH4>
        <ToolbarButton icon={<DiagramIcon name='start-event' />} onClick={() => addNodeType('start-event')} />
        <ToolbarButton icon={<DiagramIcon name='end-event' />} onClick={() => addNodeType('end-event')} />
      </ToolbarContainer>
      <ToolbarContainer>
        <StyledH4>Nodes</StyledH4>
        <ToolbarButton icon={<DiagramIcon name='add' />} onClick={() => addNodeType('add')} />
        <ToolbarButton icon={<DiagramIcon name='move' />} onClick={() => addNodeType('move')} />
        <ToolbarButton icon={<DiagramIcon name='script' />} onClick={() => addNodeType('script')} />
        <ToolbarButton icon={<DiagramIcon name='timer' />} onClick={() => addNodeType('timer')} />
      </ToolbarContainer>
      <ToolbarContainer>
        <StyledH4>Conditions</StyledH4>
        <ToolbarButton icon={<DiagramIcon name='pre-conditions' />} onClick={() => addNodeType('pre-conditions')} />
        <ToolbarButton icon={<DiagramIcon name='post-conditions' />} onClick={() => addNodeType('post-conditions')} />
      </ToolbarContainer>
    </>
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