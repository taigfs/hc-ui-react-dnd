import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect, useState } from "react";

import { KaboomGrid } from "../KaboomGrid";
import { boardSize, cellSize } from "../../enum";
import { KaboomService } from "../../services/KaboomService";
import { useBoardStore } from "../../state/BoardStore";
import { uuidv4 } from "../../utils/uuidv4";
import { useGetMapAssetSprites } from "../../hooks/use-scene";
import { useSpriteLoad } from "../../providers/sprite-load-provider";
import { useExecutionStore } from "../../state/ExecutionStore";
import { MoveNodeInput } from "../../types/node-inputs/move-node-input.type";
import { ColumnNumbers, Container, NumberCell, RowNumbers, SquaresContainer } from "./styles";
import { useStoryExecution } from "../../hooks/use-story";
import { useAppStore } from "../../state/AppStore";

interface KaboomProps {
  hidden: boolean;
}

export const Kaboom: React.FC<KaboomProps> = ({ hidden }) => {
  const { spritesLoaded, setSpritesLoaded } = useSpriteLoad();
  const [isKaboomInitialized, setIsKaboomInitialized] = useState(false);
  const { setIsPlaying, agentSprites, agentPositions, mapAssetPositions } = useBoardStore((store) => store);
  const { messages, getLastMessage } = useExecutionStore((store) => store);
  const { currentStory } = useAppStore((store) => store);
  const { postExecuteStory: executeStory } = useStoryExecution(currentStory?.id || 0);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const kaboomRef = React.useRef<KaboomCtx | null>(null);
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
        console.log(agentPosition);
        KaboomService.addAgentSprite(
          k,
          agentPosition.sprite,
          agentPosition.x,
          agentPosition.y,
          agentPosition.id
        );
      });
        
      k.onLoad(() => {
        executeStory();
      });
    });

    k.go(sceneId);
  }, [hidden, isKaboomInitialized]);

  useEffect(() => {
    const k = kaboomRef.current;
    if (!k || hidden || !isKaboomInitialized) {
      return;
    }

    const lastMessage = getLastMessage();
    if (!lastMessage) {
      return;
    }

    console.log(lastMessage);

    if (lastMessage.nodeType === 'move') {
      console.log('move')
      const actionData: MoveNodeInput = lastMessage.inputData;
      KaboomService.moveAgent(k, null, actionData.moveToX, actionData.moveToY, actionData.agent+``, null)
    } else if (lastMessage.nodeType === 'end-event') {
      console.log('end-event')
      setIsPlaying(false);
    }
  }, [hidden, isKaboomInitialized, messages]);

  const rowNumbers = [];
  const colNumbers = [];
  for (let i = 1; i <= boardSize; i++) {
    rowNumbers.push(i);
    colNumbers.push(i);
  }

  return (
    <Container hidden={hidden}>
      <RowNumbers>
        {rowNumbers.map((rowNumber) => (
          <NumberCell key={rowNumber}>{rowNumber}</NumberCell>
        ))}
      </RowNumbers>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ColumnNumbers>
          {colNumbers.map((colNumber) => (
              <NumberCell key={colNumber}>{colNumber}</NumberCell>
            ))}
        </ColumnNumbers>
        <SquaresContainer>
          <canvas ref={canvasRef} />
          <KaboomGrid />
        </SquaresContainer>
      </div>
    </Container>
  );
};