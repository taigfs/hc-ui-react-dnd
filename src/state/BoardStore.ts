import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { MapAssetPositions } from "../interfaces/MapAssetPositions";
import { MapAssetRange } from "../interfaces/MapAssetRange";
import { getAffectedSquares } from "../utils/get-affected-squares";
import { AgentSprite } from "../interfaces/AgentSprite";

interface BoardState {
  mapAssetPositions: MapAssetPositions;
  setMapAsset: (x: number, y: number, sprite: string) => void;
  activeMapAssetButton: string | null;
  setActiveMapAssetButton: (id: string | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (down: boolean) => void;
  activeMapAssetRange: MapAssetRange;
  setActiveMapAssetRange: (range: MapAssetRange) => void;
  setMapAssetPositions: (positions: MapAssetPositions) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  agentSprites: Record<string, AgentSprite>;
  setAgentSprites: (sprites: Record<string, AgentSprite>) => void;
  getAgentSpriteById: (id: string) => AgentSprite | undefined;
  reset: () => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      activeMapAssetRange: 1,
      activeMapAssetButton: null,
      isMouseDown: false,
      mapAssetPositions: [],
      reset: () =>
        set((state) => ({
          mapAssetPositions: [],
        })),
      setIsMouseDown: (down: boolean) =>
        set((state) => ({
          isMouseDown: down,
        })),
      setActiveMapAssetRange: (range: MapAssetRange) =>
        set((state) => ({
          activeMapAssetRange: range,
        })),
      setMapAsset: (x: number, y: number, sprite: string) =>
        set((state) => {
          const affectedSquares = getAffectedSquares(x, y, sprite, state.activeMapAssetRange - 1);
          const newMapAssetPositions = [...state.mapAssetPositions];

          affectedSquares.forEach((square) => {
            const index = newMapAssetPositions.findIndex(
              (asset) => asset.x === square.x && asset.y === square.y
            );
      
            if (index === -1) {
              newMapAssetPositions.push(square);
            } else {
              newMapAssetPositions[index].sprite = square.sprite;
            }
          });

          return { ...state, mapAssetPositions: newMapAssetPositions };
        }),
      setActiveMapAssetButton: (id: string | null) =>
        set((state) => ({
          activeMapAssetButton: id,
        })),
      setMapAssetPositions: (positions: MapAssetPositions) =>
        set((state) => ({
          mapAssetPositions: positions,
        })),
      isPlaying: false,
      setIsPlaying: (playing: boolean) =>
        set((state) => ({
          isPlaying: playing,
        })),
      agentSprites: {},
      setAgentSprites: (sprites: Record<string, AgentSprite>) =>
        set((state) => ({
          agentSprites: sprites,
        })),
      getAgentSpriteById: (id: string) => get().agentSprites[id],
      }),
      {
        name: "board-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
);
