import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect } from "react";
import styled from "styled-components";

import { KaboomGrid } from "../../components/KaboomGrid";
import { boardDimensions, boardSize, cellSize } from "../../enum";
import { KaboomService } from "../../services/KaboomService";
import { useBoardStore } from "../../state/BoardStore";
import { uuidv4 } from "../../utils/uuidv4";
import { useGetMapAssetSprites } from "../../hooks/use-scene";
import { useSpriteLoad } from "../../providers/sprite-load-provider";

interface KaboomProps {
  hidden: boolean;
}

export const Kaboom: React.FC<KaboomProps> = ({ hidden }) => {
  const { spritesLoaded, setSpritesLoaded } = useSpriteLoad();
  const { setIsPlaying, agentSprites } = useBoardStore((store) => store);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const kaboomRef = React.useRef<KaboomCtx | null>(null);
  const { agentPositions, mapAssetPositions } = useBoardStore((store) => store);
  const { data: mapAssetSprites } = useGetMapAssetSprites();

  // just make sure this is only run once on mount so your game state is not messed up
  useEffect(() => {
    if (!mapAssetSprites || Object.keys(agentSprites).length === 0  || spritesLoaded) { return; }

    const canvas = canvasRef.current || undefined;
    const k = kaboom({
      global: false,
      canvas,
      width: boardSize * cellSize,
      height: boardSize * cellSize,
      background: [0, 0, 0],
    });

    kaboomRef.current = k;

    KaboomService.loadSprites(k, mapAssetSprites, agentSprites);
    setSpritesLoaded(true);
  }, [mapAssetSprites, spritesLoaded, agentSprites]);

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
        const movePromises = [];
        movePromises.push(
          KaboomService.moveAgent(
            k,
            agentPositions[0].sprite,
            8,
            4,
            agentPositions[0].id,
            agentSprites,
          )
        );
        movePromises.push(
          KaboomService.moveAgent(
            k,
            agentPositions[1].sprite,
            9,
            6,
            agentPositions[1].id,
            agentSprites,
          )
        );

        Promise.all(movePromises).then(() => {
          setIsPlaying(false); // Chame sua função aqui
        });
      });
    });

    k.go(sceneId);
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
