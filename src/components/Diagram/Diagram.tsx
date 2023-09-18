import React from 'react';
import ReactFlow, { Background, Connection, ConnectionMode, Controls, Node } from 'reactflow';
import { useDiagramStore } from '../../state/DiagramStore';
import 'reactflow/dist/style.css';
import { EDGE_TYPES } from '../../types/edge-types.type';
import { NODE_TYPES } from '../../types/node-types.type';
import { useNodeAndEdgeInstance } from '../../hooks/use-story';
import { useLocalNodes } from '../../hooks/use-local-nodes';
import { useLocalEdges } from '../../hooks/use-local-edges';

export const Diagram: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect: onConnectStore
  } = useDiagramStore((state) => state);

  const { setSelectedNode } = useDiagramStore((s) => s);
  const { updateXY: updateNodeXY } = useLocalNodes();
  const { create: createEdge } = useLocalEdges();

  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    updateNodeXY(node.id, node.position.x, node.position.y);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onConnect = (connection: Connection) => {
    const { source, target, sourceHandle, targetHandle } = connection;
    
    if (!source || !target || !sourceHandle || !targetHandle) {
      throw new Error('Invalid connection');
    }

    onConnectStore(connection);
    createEdge({
      sourceHandle,
      targetHandle,
      sourceNodeId: source,
      targetNodeId: target
    });
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
