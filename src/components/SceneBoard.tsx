import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { useAppStore } from '../state/AppStore';
import { useGetScene } from '../hooks/use-scene';
import { mapAssetInstanceToMapAssetPosition } from '../utils/map-asset-instance-to-map-asset-position';
import Board from '../pages/ScenePage/Board';
import { Kaboom } from '../pages/ScenePage/Kaboom';
import { useBoardStore } from '../state/BoardStore';

export const SceneBoard = () => {
  const { currentScene } = useAppStore((state) => state);
  const { setMapAssetPositions, setIsMouseDown, setIsPlaying, isPlaying } = useBoardStore((state) => state);

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  const { data: scene, isLoading } = useGetScene(currentScene?.id || 0);

  useEffect(() => {
    if (!isLoading && scene) {
      const mapAssetPositions = mapAssetInstanceToMapAssetPosition(scene.mapAsset?.data || []);
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
  background-color: ${(props) => props.theme.color.squareBg};
  color: white;
  position: relative;
`;
