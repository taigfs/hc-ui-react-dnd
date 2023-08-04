import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";

import Board from "./Board";
import { Kaboom } from "./Kaboom";
import { AgentsToolbar } from "../../components/Toolbar/AgentsToolbar";
import { MapAssetsToolbar } from "../../components/Toolbar/MapAssetsToolbar";
import { useBoardStore } from "../../state/BoardStore";
import { HCLayout } from "../../components/HCLayout";

export function ScenePage() {
  const setIsMouseDown = useBoardStore((state) => state.setIsMouseDown);

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  const [isKaboomActive, setIsKaboomActive] = useState<boolean>(true);

  const Toggler = () => (
    <div>
      <button
        onClick={() => setIsKaboomActive(false)}
        disabled={!isKaboomActive}
      >
        editor
      </button>
      <button onClick={() => setIsKaboomActive(true)} disabled={isKaboomActive}>
        simulation
      </button>
    </div>
  );

  return (
    <HCLayout>
      <DndProvider backend={HTML5Backend}>
        <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <Toggler />
          <Toolbars>
            <AgentsToolbar />
            <MapAssetsToolbar />
          </Toolbars>
          <Board hidden={isKaboomActive} />
          <Kaboom hidden={!isKaboomActive} />
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
  & > div:first-of-type {
    margin-bottom: 16px;
  }
`;
