import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect } from "react";
import styled from "styled-components";

import { KaboomGrid } from "../components/KaboomGrid";
import { boardDimensions, boardSize, cellSize } from "../enum";
import { KaboomService } from "../services/KaboomService";
import { useBoardStore } from "../state/BoardStore";
import { uuidv4 } from "../utils/uuidv4";

interface KaboomProps {
  hidden: boolean;
}

export const Kaboom: React.FC<KaboomProps> = ({ hidden }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const kaboomRef = React.useRef<KaboomCtx | null>(null);
  const { agentPositions, mapAssetPositions } = useBoardStore((store) => store);

  // just make sure this is only run once on mount so your game state is not messed up
  useEffect(() => {
    const canvas = canvasRef.current || undefined;
    const k = kaboom({
      // if you don't want to import to the global namespace
      global: false,
      canvas,
      width: boardSize * cellSize,
      height: boardSize * cellSize,
      background: [0, 0, 0],
    });

    kaboomRef.current = k;

    KaboomService.loadSprites(k);
  }, []);

  useEffect(() => {
    const k = kaboomRef.current;
    if (!k || hidden) {
      return;
    }

    const sceneId = uuidv4();
    k.scene(sceneId, () => {
      mapAssetPositions.forEach((mapAssetPosition) => {
        KaboomService.addMapAssetSprite(
          k,
          mapAssetPosition.sprite,
          mapAssetPosition.x,
          mapAssetPosition.y
        );
      });

      agentPositions.forEach((agentPosition) => {
        KaboomService.addAgentSprite(
          k,
          agentPosition.sprite,
          agentPosition.x,
          agentPosition.y,
          agentPosition.id
        );
      });

      k.onLoad(() => {
        KaboomService.moveAgent(
          k,
          agentPositions[0].sprite,
          8,
          4,
          agentPositions[0].id
        );
        KaboomService.moveAgent(
          k,
          agentPositions[1].sprite,
          9,
          6,
          agentPositions[1].id
        );
      });
    });

    k.go(sceneId);

    setTimeout(() => {
      KaboomService.moveAgent(
        k,
        agentPositions[0].sprite,
        8,
        4,
        agentPositions[0].id
      );
      KaboomService.moveAgent(
        k,
        agentPositions[1].sprite,
        9,
        5,
        agentPositions[1].id
      );
    }, 500);
  }, [hidden]);

  return (
    <Container hidden={hidden}>
      <canvas ref={canvasRef} />
      <KaboomGrid />
    </Container>
  );
};

interface ContainerProps {
  hidden: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${boardDimensions[0]}px;
  height: ${boardDimensions[1]}px;
`;
