import { create } from 'zustand'

interface GameState {
  bears: number;
  knightPosition: [number, number];
  setKnightPosition: (x: number, y: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  bears: 0,
  knightPosition: [0, 0],
  setKnightPosition: (x: number, y: number) => set((state) => ({
    knightPosition: [x, y],
  })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))