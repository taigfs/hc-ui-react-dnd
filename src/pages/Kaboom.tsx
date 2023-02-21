import kaboom from 'kaboom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { KaboomGrid } from '../components/KaboomGrid';
import { boardDimensions, boardSize, cellSize } from '../enum';
import { KaboomService } from '../services/KaboomService';
import { useBoardStore } from '../state/BoardStore';

export const Kaboom: React.FC = () => {
  
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const { agentPositions, mapAssetPositions } = useBoardStore(store => store);

	// just make sure this is only run once on mount so your game state is not messed up
	useEffect(() => {

    const canvas = canvasRef.current || undefined;
		const k = kaboom({
			// if you don't want to import to the global namespace
			global: false,
			canvas: canvas,
      width: boardSize * cellSize,
      height: boardSize * cellSize,
      background: [0, 0, 0],
		});

		console.log(agentPositions);
		agentPositions.forEach((agentPosition) => {
			KaboomService.loadSprite(k, agentPosition.sprite);
			KaboomService.addSprite(k, agentPosition.sprite, agentPosition.x, agentPosition.y, agentPosition.id);
		});

		k.onLoad(() => {
			KaboomService.moveAgent(k, 'man.png', 8, 4, agentPositions[0].id);
			// KaboomService.moveAgent(k, 'man.png', 8, 4, () => {
			// 	KaboomService.moveAgent(k, 'man.png', 0, 0);
			// });
			// KaboomService.moveAgent(k, 'woman.png', 9, 5);
		});

	}, []);

	return (
    <Container>
      <canvas ref={canvasRef}></canvas>
      <KaboomGrid />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: ${boardDimensions[0]}px;
  height: ${boardDimensions[1]}px;
`;