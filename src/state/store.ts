import { create } from 'zustand'
import { AgentPositions } from '../interfaces/AgentPositions';

interface BoardState {
  agentPositions: AgentPositions;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  agentPositions: [[0 , 0]],
  setAgentPosition: (index: number, x: number, y: number) => set((state) => {
    const newAgentPositions = [...state.agentPositions];
    newAgentPositions[index] = [x, y];
    return {
      agentPositions: newAgentPositions,
    };
  }),
  addAgent: (x: number, y: number) => set((state) => ({
    agentPositions: [...state.agentPositions, [x, y]],
  })),

}))