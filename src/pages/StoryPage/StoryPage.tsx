import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";

import Board from "./Board";
import { Kaboom } from "./Kaboom";
import { AgentsToolbar } from "../../components/Toolbar/AgentsToolbar";
import { MapAssetsToolbar } from "../../components/Toolbar/MapAssetsToolbar";
import { useBoardStore } from "../../state/BoardStore";
import { HCLayout } from "../../components/HCLayout";
import { useGetScene } from "../../hooks/use-scene";
import { mapAssetInstanceToMapAssetPosition } from "../../utils/map-asset-instance-to-map-asset-position";
import { useAppStore } from "../../state/AppStore";

export function StoryPage() {
  const { setMapAssetPositions, setIsMouseDown, setIsPlaying, isPlaying } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);

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
    <HCLayout hasContent={false}>
      <DndProvider backend={HTML5Backend}>
        <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <Toolbars>
            <AgentsToolbar />
            <MapAssetsToolbar />
          </Toolbars>
          <Board hidden={isPlaying} />
          <Kaboom hidden={!isPlaying} />
        </Container>
      </DndProvider>
    </HCLayout>
  );
}

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

const Toolbars = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 2px solid ${({ theme }) => theme.color.squareBorder};
`;