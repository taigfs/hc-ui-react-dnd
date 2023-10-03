import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect, useState } from "react";

import { KaboomGrid } from "../KaboomGrid";
import { boardSize, cellSize } from "../../enum";
import { KaboomService } from "../../services/KaboomService";
import { useBoardStore } from "../../state/BoardStore";
import { uuidv4 } from "../../utils/uuidv4";
import { MoveNodeInput } from "../../types/node-inputs/move-node-input.type";
import { ColumnNumbers, Container, NumberCell, RowNumbers, SquaresContainer } from "./styles";
import { useAppStore } from "../../state/AppStore";
import { useLocalAgents } from "../../hooks/use-local-agents";
import { agentInstancesToAgentPositions } from "../../utils/agent-instance-to-agent-position";
import { useLocalExecution } from "../../hooks/use-local-execution";
import { useGetMapAssetSprites } from "../../hooks/use-project";
import { BrowserTesterService } from "../../services/browser-tester.service";

interface KaboomProps {
  hidden: boolean;
}

export const Kaboom: React.FC<KaboomProps> = ({ hidden }) => {
  const [spritesLoaded, setSpritesLoaded] = useState<boolean>(false);
  const [isKaboomInitialized, setIsKaboomInitialized] = useState(false);
  const { setIsPlaying, agentSprites, mapAssetPositions } = useBoardStore((store) => store);
  const { currentStory } = useAppStore((store) => store);
  const { currentExecutionLogs, executeStory } = useLocalExecution();
  const { agents } = useLocalAgents();
  const instanceId = '123';

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
    const agentPositions = agentInstancesToAgentPositions(agents);
    
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
        if (!currentStory?.id) {
          throw new Error('No current story id found');
        }
        executeStory(currentStory?.id);
      });
    });

    k.go(sceneId);
  }, [hidden, isKaboomInitialized]);

  useEffect(() => {
    const k = kaboomRef.current;
    if (!k || hidden || !isKaboomInitialized) {
      return;
    }

    const lastAction = currentExecutionLogs[currentExecutionLogs.length - 1];
    if (!lastAction) {
      return;
    }
    console.log(lastAction);

    if (lastAction.nodeType === 'move') {
      const actionData: MoveNodeInput = lastAction.inputData;
      KaboomService.moveAgent(k, null, actionData.moveToX, actionData.moveToY, actionData.agent+``)
    } else if (lastAction.nodeType === 'browser-open') {
      if (!lastAction.inputData) { throw new Error('No input data found'); }
      BrowserTesterService.openBrowser(lastAction.inputData.url, instanceId);
    } else if (lastAction.nodeType === 'browser-click') {
      if (!lastAction.inputData) { throw new Error('No input data found'); }
      BrowserTesterService.clickElement(lastAction.inputData.selector, instanceId);
    } else if (lastAction.nodeType === 'browser-type') {
      if (!lastAction.inputData) { throw new Error('No input data found'); }
      BrowserTesterService.typeText(lastAction.inputData.selector, lastAction.inputData.text, instanceId);
    } else if (lastAction.nodeType === 'browser-close') {
      BrowserTesterService.closeBrowser(instanceId);
    } else if (lastAction.nodeType === 'end-event') {
      setIsPlaying(false);
    }
  }, [hidden, isKaboomInitialized, currentExecutionLogs]);

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