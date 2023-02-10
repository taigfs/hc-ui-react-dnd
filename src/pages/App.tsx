import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled, { ThemeProvider } from "styled-components";
import { AgentsToolbar } from "../components/Toolbar/AgentsToolbar";
import Board from "../components/Board";
import { defaultTheme } from "../themes/DefaultTheme";
import { MapAssetsToolbar } from "../components/Toolbar/MapAssetsToolbar";
import { useBoardStore } from "../state/store";

function App() {

  const setIsMouseDown = useBoardStore((state) => state.setIsMouseDown);  
  
  const onMouseDown = () => setIsMouseDown(true);
  const onMouseUp = () => setIsMouseDown(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DndProvider backend={HTML5Backend}>
        <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <Toolbars>
            <AgentsToolbar />
            <MapAssetsToolbar />
          </Toolbars>
          <Board />
        </Container>
      </DndProvider>
    </ThemeProvider>
  )
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const Toolbars = styled.div`
  position: absolute;
  left: 20px;
  top: 30px;
  & > div:first-of-type {
    margin-bottom: 16px;
  }
`;