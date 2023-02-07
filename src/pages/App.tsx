import Board from "../components/Board";
import { useGameStore } from "../state/store";

function App() {

  const knightPosition = useGameStore((state) => state.knightPosition);
  return (
    <div>
      <Board knightPosition={knightPosition} />
    </div>
  )
}

export default App
