import { create } from 'zustand'
import { AgentSprite } from '../enum';
import { MapAssetSprites } from '../enum/MapAssets';
import { AgentPositions } from '../interfaces/AgentPositions';
import { MapAssetPositions } from '../interfaces/MapAssetPositions';
import { MapAssetRange } from '../interfaces/MapAssetRange';

interface BoardState {
  selectedAgentIndex: number | null;
  agentPositions: AgentPositions;
  mapAssetPositions: MapAssetPositions;
  setMapAsset: (x: number, y: number, sprite: string) => void;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number, sprite: string, name: string) => void;
  activeButton: string | null;
  setActiveButton: (id: string | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (down: boolean) => void;
  setSelectedAgentIndex: (i: number | null) => void;
  activeMapAssetRange: MapAssetRange;
  setActiveMapAssetRange: (range: MapAssetRange) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  activeMapAssetRange: 1,
  selectedAgentIndex: null,
  activeButton: null,
  isMouseDown: false,
  mapAssetPositions: [
    {x: 1, y: 1, sprite: '3'}
  ],
  agentPositions: [
    {
      x: 0,
      y: 0,
      sprite: AgentSprite.MAN
    }
  ],
  setIsMouseDown: (down: boolean) => set((state) => ({
    isMouseDown: down
  })),
  setActiveMapAssetRange: (range: MapAssetRange) => set((state) => ({
    activeMapAssetRange: range,
  })),
  setSelectedAgentIndex: (i: number | null) => set((state) => ({
    selectedAgentIndex: i
  })),
  setAgentPosition: (index: number, x: number, y: number) => set((state) => ({
    agentPositions: state.agentPositions.map((agent, i) => {
      if (i === index) {
        return { ...agent, x, y };
      }
      return agent;
    })
  })),
  setMapAsset: (x: number, y: number, sprite: string) => set((state) => {
    const range = state.activeMapAssetRange - 1;
    const newMapAssetPositions = [...state.mapAssetPositions];
    console.log(newMapAssetPositions);

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const newX = x + i;
        const newY = y + j;

        const index = newMapAssetPositions.findIndex(
          (asset) => asset.x === newX && asset.y === newY
        );

        if (index === -1) {
          newMapAssetPositions.push({ x: newX, y: newY, sprite });
        } else {
          newMapAssetPositions[index].sprite = sprite;
        }
      }
    }

    return { ...state, mapAssetPositions: newMapAssetPositions };
  }),
  addAgent: (x: number, y: number, sprite: string, name: string) => set((state) => ({
    agentPositions: [...state.agentPositions, { x, y, sprite, name }],
  })),
  setActiveButton: (id: string | null) => set((state) => ({
    activeButton: id,
  }))

}))