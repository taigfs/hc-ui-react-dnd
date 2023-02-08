import { useDrag } from "react-dnd"
import styled from "styled-components";
import { AgentSprite, ItemTypes } from "../enum"
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";
import { useBoardStore } from "../state/store";

interface AgentProps {
  agentIndex: number;
  sprite: AgentSprite;
}

export default function Agent({ agentIndex, sprite }: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex, sprite };
  
  const setActiveButton = useBoardStore((state) => state.setActiveButton);
  const onClick = () => setActiveButton(null);

  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return <Container ref={drag} isDragging={isDragging} onClick={onClick}>{sprite}</Container>
}

interface AgentButtonProps {
  sprite: AgentSprite;
}

export function AgentButton ({ sprite }: AgentButtonProps) {
  const item: AgentButtonItemProps = { type: ItemTypes.AGENT_BUTTON, sprite };
  
  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Container 
      ref={drag}
      isDragging={isDragging}
    >
      { sprite }
    </Container>
  )
}

interface ContainerProps {
  isDragging: boolean;
}

const Container = styled.div<ContainerProps>`
  opacity: ${({ isDragging }) => isDragging ? '0.5' : '1'};
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 32pt;
  text-align: center;
  font-weight: bold;
  cursor: move;
  background: transparent;
`;