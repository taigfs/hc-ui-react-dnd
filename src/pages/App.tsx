import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled, { ThemeProvider } from "styled-components";
import { AgentsToolbar } from "../components/AgentsToolbar";
import Board from "../components/Board";
import { useBoardStore } from "../state/store";
import { defaultTheme } from "../themes/DefaultTheme";

function App() {

  const agentPositions = useBoardStore((state) => state.agentPositions);

  return (
    <ThemeProvider theme={defaultTheme}>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Toolbars>
            <AgentsToolbar />
          </Toolbars>
          <Board agentPositions={agentPositions} />
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
`;