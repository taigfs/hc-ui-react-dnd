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
    set((state) => {
      if (state.past.nodes.length === 0) { return state; }
      const previousNodes = state.past.nodes.pop();
      const previousEdges = state.past.edges.pop();
      const futureNodes = [...state.future.nodes, state.nodes];
      const futureEdges = [...state.future.edges, state.edges];
      return {
        ...state,
        nodes: previousNodes,
        edges: previousEdges,
        past: state.past,
        future: {
          nodes: futureNodes,
          edges: futureEdges
        }
      };
    })
  },
  redo: () => {
    set((state) => {
      if (state.future.nodes.length === 0 && state.future.edges.length === 0) { return state; }
      const futureNodes = state.future.nodes.pop();
      const futureEdges = state.future.edges.pop();
      const previousNodes = [...state.past.nodes, state.nodes];
      const previousEdges = [...state.past.edges, state.edges];
      return {
        ...state,
        nodes: futureNodes,
        edges: futureEdges,
        future: state.future,
        past: {
          nodes: previousNodes,
          edges: previousEdges
        }
      };
    })
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label };
        }
  
        return node;
      }),
    });
  },
  addNode: (newNode: Node) => {
    set({
      nodes: [
        ...get().nodes,
        newNode
      ]
    })
  },
  removeNode: (nodeId: string) => {
    set((state) => {
      const nodes: Node[] = get().nodes.filter((node) => node.id !== nodeId);
      const edges = get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      const pastNodes: Node[][] = [...state.past.nodes, state.nodes];
      const pastEdges: Edge[][] = [...state.past.edges, state.edges];
      state.future.nodes.length = 0;
      state.future.edges.length = 0;
      return { 
        ...state,
        nodes,
        edges,
        past: {
          nodes: pastNodes,
          edges: pastEdges
        },
        future: state.future,
      };
    })
  },
  removeEdge: (edgeId: string) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId)
    })
  },
  executeNode: (nodeId: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, executing: true };
        }
        return node;
      }),
    })
  },
  stopExecution: () => {
    set({
      nodes: get().nodes.map((node) => {
        node.data = { ...node.data, executing: false };
        return node;
      }),
    })
  },
}));