import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect, useState } from "react";
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
  const [isKaboomInitialized, setIsKaboomInitialized] = useState(false);
  const { setIsPlaying, agentSprites, actionSequence } = useBoardStore((store) => store);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const kaboomRef = React.useRef<KaboomCtx | null>(null);
  const { agentPositions, mapAssetPositions } = useBoardStore((store) => store);
  const { data: mapAssetSprites } = useGetMapAssetSprites();


  useEffect(() => {
    if (kaboomRef.current) { return; }

    const canvas = canvasRef.current || undefined;
    const k = kaboom({
      global: false,
      canvas,
      width: boardSize * cellSize,
      height: boardSize * cellSize,
      background: [17, 17, 17],
    });
    kaboomRef.current = k;

    return () => {
      // Unmount logic
      if (kaboomRef.current) {
        kaboomRef.current.destroyAll("*");
        kaboomRef.current = null;
      }
      setSpritesLoaded(false);
    };
  }, []);
  
  useEffect(() => {
    const k = kaboomRef.current;
    if (k === null || !mapAssetSprites || Object.keys(agentSprites).length === 0  || spritesLoaded || isKaboomInitialized) { return; }

    KaboomService.loadSprites(k, mapAssetSprites, agentSprites);
    setSpritesLoaded(true);
    setIsKaboomInitialized(true);
  }, [kaboomRef.current, mapAssetSprites, agentSprites, spritesLoaded, isKaboomInitialized]);

  useEffect(() => {
    const k = kaboomRef.current;
    
    if (!k || hidden || !isKaboomInitialized) {
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
        KaboomService.executeActions(k, actionSequence, "sequence").then(() => {
          setTimeout(() => {
            setIsPlaying(false);
          }, 500);
        });
      });
    });

    k.go(sceneId);
  }, [hidden, isKaboomInitialized]);

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
