import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled, { ThemeProvider } from "styled-components";

import { Kaboom } from "./Kaboom";
import Board from "../components/Board";
import { AgentsToolbar } from "../components/Toolbar/AgentsToolbar";
import { MapAssetsToolbar } from "../components/Toolbar/MapAssetsToolbar";
import { useBoardStore } from "../state/BoardStore";

export function Scene() {
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
`;

const Toolbars = styled.div`
  position: absolute;
  left: 20px;
  top: 30px;
  & > div:first-of-type {
    margin-bottom: 16px;
  }
`;
