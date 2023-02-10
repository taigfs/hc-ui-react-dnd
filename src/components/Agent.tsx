import { useDrag } from "react-dnd"
import styled from "styled-components";
import { AgentSprite, ItemTypes } from "../enum"
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";
import { useBoardStore } from "../state/store";
import { AgentImage } from "./AgentImage";

interface AgentProps {
  agentIndex: number;
  sprite: string;
}

export default function Agent({ agentIndex, sprite }: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex, sprite };
  
  const { setActiveButton, setSelectedAgentIndex, selectedAgentIndex } = useBoardStore((state) => state);

  const isSelected = agentIndex === selectedAgentIndex;

  const onClick = () => {
    setActiveButton(null);
    setSelectedAgentIndex(agentIndex);
  };

  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item: () => {
      setActiveButton(null);
      return item;
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const Handlers = () => (
    <HandlersContainer handlerSize={10}>
      <Handler />
      <Handler />
      <Handler />
      <Handler />
    </HandlersContainer>
  );

  return (
    <Container ref={drag} isDragging={isDragging} onClick={onClick} isSelected={isSelected}>
      <AgentImage sprite={sprite} />
      { !!isSelected && <Handlers /> }
    </Container>
  );
}

interface AgentButtonProps {
  sprite: string;
}

export function AgentButton ({ sprite }: AgentButtonProps) {
  const setActiveButton = useBoardStore((state) => state.setActiveButton);
  const item: AgentButtonItemProps = { type: ItemTypes.AGENT_BUTTON, sprite };
  
  const [{isDragging}, drag] = useDrag(() => ({
    type: item.type,
    item: () => {
      setActiveButton(null);
      return item;
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Container 
      ref={drag}
      isDragging={isDragging}
    >
      <AgentImage sprite={sprite} />
    </Container>
  )
}

interface ContainerProps {
  isDragging: boolean;
  isSelected?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  opacity: ${({ isDragging }) => isDragging ? '0.5' : '1'};
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32pt;
  text-align: center;
  font-weight: bold;
  cursor: move;
  background: transparent;
  box-sizing: border-box;
  ${({ isSelected, theme }) => isSelected ? `border: 2px solid ${theme.color.featuredSquareBorder};` : ``}
`;

interface HandlersContainerProps {
  handlerSize: number;
}

const HandlersContainer = styled.div<HandlersContainerProps>`

  div {
    width: ${({ handlerSize }) => handlerSize}px;
    height: ${({ handlerSize }) => handlerSize}px;
  }

  div:nth-child(1) {
    top: -${({ handlerSize }) => handlerSize/2}px;
    left: -${({ handlerSize }) => handlerSize/2}px;
  }

  div:nth-child(2) {
    top: -${({ handlerSize }) => handlerSize/2}px;
    right: -${({ handlerSize }) => handlerSize/2}px;
  }

  div:nth-child(3) {
    bottom: -${({ handlerSize }) => handlerSize/2}px;
    left: -${({ handlerSize }) => handlerSize/2}px;
  }

  div:nth-child(4) {
    bottom: -${({ handlerSize }) => handlerSize/2}px;
    right: -${({ handlerSize }) => handlerSize/2}px;
  }
`;

const Handler = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.color.featuredSquareBorder};
`;