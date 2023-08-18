import React from 'react';
import ReactFlow, { Background, ConnectionMode, Controls } from 'reactflow';
import { useDiagramStore } from '../../state/DiagramStore';
import 'reactflow/dist/style.css';
import { EDGE_TYPES } from '../../types/edge-types.type';
import { NODE_TYPES } from '../../types/node-types.type';

export const Diagram: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useDiagramStore((state) => state);

  return (
    <ReactFlow
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      defaultEdgeOptions={{
        type: 'default'
      }}
    >
      <Background 
        gap={12}
        size={2}
        color="#111"
      />
      <Controls />
    </ReactFlow>
  );
};