import kaboom, { GameObj } from 'kaboom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { KaboomGrid } from '../components/KaboomGrid';
import { boardDimensions, boardSize, cellSize } from '../enum';
import { getAgentAssetSpritePath } from '../enum/AgentAssets';
import { KaboomService } from '../services/KaboomService';

export const Kaboom: React.FC = () => {
  
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

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

		KaboomService.loadSprite(k, 'man.png');
		KaboomService.loadSprite(k, 'woman.png');

		KaboomService.addSprite(k, 'man.png', 0, 0);
		KaboomService.addSprite(k, 'woman.png', 1, 1);

		k.onLoad(() => {
			KaboomService.moveAgent(k, 'man.png', 4, 1);
			KaboomService.moveAgent(k, 'woman.png', 5, 2);
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