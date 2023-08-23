import React from 'react';
import ReactFlow, { Background, Connection, ConnectionMode, Controls, Node } from 'reactflow';
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
    onConnect: onConnectStore
  } = useDiagramStore((state) => state);

  const { patchNode, postEdge } = useNodeAndEdgeInstance();
  const { setSelectedNode } = useDiagramStore((s) => s);

  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    console.log('can be calling without changes');
    const storeNode = nodes.find((n) => n.id === node.id);
    const id = getValueAfterUnderscore(node.id);
    patchNode({
      id, updates: { x: node.position.x, y: node.position.y }
    });
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onConnect = (connection: Connection) => {
    const { source, target, sourceHandle, targetHandle } = connection;
    onConnectStore(connection);
    postEdge({
      sourceHandle,
      targetHandle,
      sourceNodeId: getValueAfterUnderscore(source || ""),
      targetNodeId: getValueAfterUnderscore(target || "")
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
