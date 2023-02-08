import { useDrag } from "react-dnd"
import styled from "styled-components";
import { ItemTypes } from "../enum"
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";

interface AgentProps {
  agentIndex: number;
}

export default function Agent({ agentIndex }: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex };
  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return <Container ref={drag} isDragging={isDragging}>♘</Container>
}

export function AgentButton () {
  const item: AgentButtonItemProps = { type: ItemTypes.AGENT_BUTTON };
  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return <Container ref={drag} isDragging={isDragging}>♘</Container>
}

interface ContainerProps {
  isDragging: boolean;
}

const Container = styled.span<ContainerProps>`
  opacity: ${({ isDragging }) => isDragging ? '0.5' : '1'};
  font-size: 25;
  font-weight: bold;
  cursor: move;
  background: transparent;
`;