import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { DiagramConfiguration } from '../enum/DiagramConfiguration';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  past: {
    nodes: Node[][];
    edges: Edge[][];
  };
  future: {
    nodes: Node[][];
    edges: Edge[][];
  };
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeLabel: (nodeId: string, label: string) => void;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
  undo: () => void;
  redo: () => void;
  executeNode: (nodeId: string) => void;
  stopExecution: () => void;
  setNodes: (nodes: Node[]) => void; // New function to set nodes
  setEdges: (edges: Edge[]) => void; // New function to set edges
};

export const useDiagramStore = create<RFState>((set, get) => ({
  nodes: DiagramConfiguration.nodes,
  edges: DiagramConfiguration.edges,
  past: {
    nodes: [],
    edges: [],
  },
  future: {
    nodes: [],
    edges: []
  },
  undo: () => {
    // Existing undo logic
  },
  redo: () => {
    // Existing redo logic
  },
  onNodesChange: (changes: NodeChange[]) => {
    // Existing onNodesChange logic
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    // Existing onEdgesChange logic
  },
  onConnect: (connection: Connection) => {
    // Existing onConnect logic
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    // Existing updateNodeLabel logic
  },
  addNode: (newNode: Node) => {
    // Existing addNode logic
  },
  removeNode: (nodeId: string) => {
    // Existing removeNode logic
  },
  removeEdge: (edgeId: string) => {
    // Existing removeEdge logic
  },
  executeNode: (nodeId: string) => {
    // Existing executeNode logic
  },
  stopExecution: () => {
    // Existing stopExecution logic
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
}));
