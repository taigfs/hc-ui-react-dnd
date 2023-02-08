import { useDrag } from "react-dnd"
import styled from "styled-components";
import { AgentSprite, ItemTypes } from "../enum"
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";

interface AgentProps {
  agentIndex: number;
  sprite: AgentSprite;
}

export default function Agent({ agentIndex, sprite }: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex };
  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return <Container ref={drag} isDragging={isDragging}>{sprite}</Container>
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
  }))

  return <Container ref={drag} isDragging={isDragging}>{ sprite }</Container>
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