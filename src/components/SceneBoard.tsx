import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { useGetScene } from '../hooks/useGetScene';
import { mapAssetInstanceToMapAssetPosition } from '../utils/mapAssetUtils';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './Board';
import { Kaboom } from './Kaboom';
import styled from 'styled-components';

export const SceneBoard = () => {
  const { currentScene } = useAppStore((state) => state);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [mapAssetPositions, setMapAssetPositions] = React.useState([]);
  const isPlaying = false; // Replace with your logic for determining if the scene is playing

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  const { data: scene, isLoading } = useGetScene(currentScene?.id || 0);

  useEffect(() => {
    if (!isLoading && scene) {
      const mapAssetPositions = mapAssetInstanceToMapAssetPosition(scene.mapAssets);
      setMapAssetPositions(mapAssetPositions);
    }
  }, [isLoading, scene, setMapAssetPositions]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <Board hidden={isPlaying} />
        <Kaboom hidden={!isPlaying} />
      </Container>
    </DndProvider>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
  color: white;
  position: relative;
`;
