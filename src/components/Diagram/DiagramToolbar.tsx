import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDiagramStore } from '../../state/DiagramStore';
import { NodeType } from '../../types/node.type';
import { Node } from "reactflow";
import { ToolbarContainer } from '../Toolbar/styles';
import { DiagramIcon } from './DiagramIcon';

const ToolbarButton = styled(Button)`
  margin-right: 8px;
`;

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
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('start-event')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('add')} />
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('move')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('script')} />
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('timer')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('end-event')} />
      <ToolbarButton icon={<DeleteOutlined />} onClick={() => addNodeType('post-conditions')} />
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