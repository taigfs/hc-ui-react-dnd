import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useStore from '../../state/diagram-store';

const ToolbarButton = styled(Button)`
  margin-right: 8px;
`;

const DiagramToolbar: React.FC = () => {
  const { addNodeType } = useStore();

  return (
    <>
      <ToolbarButton icon={<PlusOutlined />} onClick={() => addNodeType('pre-conditions')} />
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('start-event')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('add')} />
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('move')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('script')} />
      <ToolbarButton icon={<ArrowUpOutlined />} onClick={() => addNodeType('timer')} />
      <ToolbarButton icon={<ArrowDownOutlined />} onClick={() => addNodeType('end-event')} />
      <ToolbarButton icon={<DeleteOutlined />} onClick={() => addNodeType('post-conditions')} />
    </>
  );
};

export default DiagramToolbar;
