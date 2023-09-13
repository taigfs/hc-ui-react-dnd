import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AgentPositions } from "../interfaces/AgentPositions";
import { MapAssetPositions } from "../interfaces/MapAssetPositions";
import { MapAssetRange } from "../interfaces/MapAssetRange";
import { uuidv4 } from "../utils/uuidv4";
import { getAffectedSquares } from "../utils/get-affected-squares";
import { AgentSprite } from "../interfaces/AgentSprite";

interface BoardState {
  selectedAgentIndex: number | null;
  agentPositions: AgentPositions;
  mapAssetPositions: MapAssetPositions;
  setMapAsset: (x: number, y: number, sprite: string) => void;
  setAgentPosition: (index: number, x: number, y: number) => void;
  addAgent: (x: number, y: number, sprite: string, name: string, id: string) => void;
  activeMapAssetButton: string | null;
  setActiveMapAssetButton: (id: string | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (down: boolean) => void;
  setSelectedAgentIndex: (i: number | null) => void;
  activeMapAssetRange: MapAssetRange;
  setActiveMapAssetRange: (range: MapAssetRange) => void;
  setMapAssetPositions: (positions: MapAssetPositions) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  agentSprites: Record<string, AgentSprite>;
  setAgentSprites: (sprites: Record<string, AgentSprite>) => void;
  getAgentSpriteById: (id: number) => AgentSprite | undefined;
  setAgentPositions: (positions: AgentPositions) => void;
  reset: () => void;
  updateAgentPositionName: (id: number, name: string) => void;
  updateAgentPositionId: (currentId: string, newId: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      activeMapAssetRange: 1,
      selectedAgentIndex: null,
      activeMapAssetButton: null,
      isMouseDown: false,
      mapAssetPositions: [],
      agentPositions: [],
      reset: () =>
        set((state) => ({
          selectedAgentIndex: null,
          agentPositions: [],
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
      setSelectedAgentIndex: (i: number | null) =>
        set((state) => ({
          selectedAgentIndex: i,
        })),
      setAgentPosition: (index: number, x: number, y: number) =>
        set((state) => ({
          agentPositions: state.agentPositions.map((agent, i) => {
            if (i === index) {
              return { ...agent, x, y };
            }
            return agent;
          }),
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
      addAgent: (x: number, y: number, sprite: string, name: string, id: string) =>
        set((state) => ({
          agentPositions: [
            ...state.agentPositions,
            { x, y, sprite, name, id },
          ],
        })),
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
      getAgentSpriteById: (id: number) => get().agentSprites[id],
      setAgentPositions: (positions: AgentPositions) =>
        set((state) => ({
          agentPositions: positions,
        })),
      updateAgentPositionName: (id: number, name: string) =>
        set((state) => ({
          agentPositions: state.agentPositions.map((agent) => {
            if (agent.id === `${id}`) {
              return { ...agent, name };
            }
            return agent;
          }
          ),
        })),
        updateAgentPositionId: (currentId: string, newId: string) =>
          set((state) => ({
            agentPositions: state.agentPositions.map((agent) => {
              if (agent.id === currentId) {
                return { ...agent, id: newId };
              }
              return agent;
            }
            ),
        })),
      }),
      {
        name: "board-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
);
