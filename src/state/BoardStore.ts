import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import useSocket from "../hooks/use-socket";

import { AgentPositions } from "../interfaces/AgentPositions";
import { MapAssetPositions } from "../interfaces/MapAssetPositions";
import { MapAssetRange } from "../interfaces/MapAssetRange";

interface BoardState {
  selectedAgentIndex: number | null;
  agentPositions: AgentPositions;
  mapAssetPositions: MapAssetPositions;
  setMapAsset: (x: number, y: number, sprite: string) => void;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number, sprite: string, name: string) => void;
  activeMapAssetButton: string | null;
  setActiveMapAssetButton: (id: string | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (down: boolean) => void;
  setSelectedAgentIndex: (i: number | null) => void;
  activeMapAssetRange: MapAssetRange;
  setActiveMapAssetRange: (range: MapAssetRange) => void;
  setMapAssetPositions: (positions: MapAssetPositions) => void;
}

export const useBoardStore = create<BoardState>((set) => {
  const socket = useSocket("your-backend-url"); // Replace "your-backend-url" with the actual backend URL

  const setMapAsset = (x: number, y: number, sprite: string) => {
    const range = state.activeMapAssetRange - 1;
    const newMapAssetPositions = [...state.mapAssetPositions];

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

        // Send message to update backend state
        if (socket) {
          socket.emit("updateMapAsset", { x: newX, y: newY, sprite });
        }
      }
    }

    set((state) => ({ ...state, mapAssetPositions: newMapAssetPositions }));
  };

  return {
    selectedAgentIndex: null,
    agentPositions: [],
    mapAssetPositions: [],
    setMapAsset,
    setAgentPosition: () => {},
    addAgent: () => {},
    activeMapAssetButton: null,
    setActiveMapAssetButton: () => {},
    isMouseDown: false,
    setIsMouseDown: () => {},
    setSelectedAgentIndex: () => {},
    activeMapAssetRange: 1,
    setActiveMapAssetRange: () => {},
    setMapAssetPositions: () => {},
  };
});
