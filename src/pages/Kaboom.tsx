import kaboom from 'kaboom';
import React from 'react';
import styled from 'styled-components';
import { KaboomGrid } from '../components/KaboomGrid';
import { boardDimensions, boardSize, cellSize } from '../enum';

export const Kaboom: React.FC = () => {
  
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

    const canvas = canvasRef.current || undefined;
		const k = kaboom({
			// if you don't want to import to the global namespace
			global: false,
			// if you don't want kaboom to create a canvas and insert under document.body
			canvas: canvas,
      width: boardSize * cellSize,
      height: boardSize * cellSize,
      background: [0, 0, 0],
		});

		k.add([
			k.text("oh hi"),
			k.pos(40, 20),
		])

		// write all your kaboom code here

	}, [])

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