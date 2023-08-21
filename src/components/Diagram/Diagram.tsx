import React from 'react';
import ReactFlow, { Background, ConnectionMode, Controls } from 'reactflow';
import { useDiagramStore } from '../../state/DiagramStore';
import 'reactflow/dist/style.css';
import { EDGE_TYPES } from '../../types/edge-types.type';
import { NODE_TYPES } from '../../types/node-types.type';
import { useNodeAndEdgeInstance } from '../../hooks/use-story';
import { getValueAfterUnderscore } from '../../utils/get-value-after-underscore';

export const Diagram: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useDiagramStore((state) => state);

  const { patchNode } = useNodeAndEdgeInstance();
  const { setSelectedNode } = useDiagramStore((s) => s);

  const onNodeDragStop = (event: React.MouseEvent, node: any) => {
    const id = getValueAfterUnderscore(node.id);
    patchNode({
      id, updates: { x: node.position.x, y: node.position.y }
    });
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  return (
    <ReactFlow
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      onNodeDragStop={onNodeDragStop}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(event, node) => setSelectedNode(node)}
      onPaneClick={onPaneClick}
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
