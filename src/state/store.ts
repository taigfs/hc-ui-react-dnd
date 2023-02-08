import { create } from 'zustand'
import { AgentSprite } from '../enum';
import { AgentPositions } from '../interfaces/AgentPositions';

interface BoardState {
  agentPositions: AgentPositions;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number, sprite: AgentSprite) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  agentPositions: [
    {
      x: 0,
      y: 0,
      sprite: AgentSprite.KNIGHT
    }
  ],
  setAgentPosition: (index: number, x: number, y: number) => set((state) => ({
    agentPositions: state.agentPositions.map((agent, i) => {
      if (i === index) {
        return { ...agent, x, y };
      }
      return agent;
    })
  })),
  addAgent: (x: number, y: number, sprite: AgentSprite) => set((state) => ({
    agentPositions: [...state.agentPositions, { x, y, sprite }],
  })),

}))