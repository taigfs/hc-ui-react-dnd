import { create } from 'zustand'
import { AgentSprite, MapAssetSprite } from '../enum';
import { AgentPositions } from '../interfaces/AgentPositions';
import { MapAssetPositions } from '../interfaces/MapAssetPositions';

interface BoardState {
  agentPositions: AgentPositions;
  mapAssetPositions: MapAssetPositions;
  setMapAsset: (x: number, y: number, sprite: MapAssetSprite) => void;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number, sprite: AgentSprite) => void;
  activeButton: string | null;
  setActiveButton: (id: string | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (down: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  activeButton: null,
  isMouseDown: false,
  setIsMouseDown: (down: boolean) => set((state) => ({
    isMouseDown: down
  })),
  mapAssetPositions: [
    {x: 1, y: 1, sprite: MapAssetSprite.GREEN_LAND}
  ],
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
  setMapAsset: (x: number, y: number, sprite: MapAssetSprite) => set((state) => {
    const newMapAssetPositions = [...state.mapAssetPositions];
    const index = newMapAssetPositions.findIndex(
      (asset) => asset.x === x && asset.y === y
    );
    if (index === -1) {
      newMapAssetPositions.push({ x, y, sprite });
    } else {
      newMapAssetPositions[index].sprite = sprite;
    }
    return { ...state, mapAssetPositions: newMapAssetPositions };
  }),
  addAgent: (x: number, y: number, sprite: AgentSprite) => set((state) => ({
    agentPositions: [...state.agentPositions, { x, y, sprite }],
  })),
  setActiveButton: (id: string | null) => set((state) => ({
    activeButton: id,
  }))

}))