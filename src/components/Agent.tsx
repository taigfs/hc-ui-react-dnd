import { useDrag } from "react-dnd";
import styled from "styled-components";

import { AgentImage } from "./AgentImage";
import { ItemTypes } from "../enum";
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";
import { useBoardStore } from "../state/BoardStore";
import { useDiagramStore } from "../state/DiagramStore";

interface AgentProps {
  agentIndex: number;
  agentId: string;
  sprite: string;
  name?: string;
}

export default function Agent({
  agentIndex,
  sprite,
  agentId,
  name = "Agent",
}: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex, sprite };

  const { setActiveMapAssetButton, setSelectedAgentIndex, selectedAgentIndex } =
    useBoardStore((state) => state);
  const { setSelectedAgentInstanceById } = useDiagramStore((state) => state);

  const isSelected = agentIndex === selectedAgentIndex;

  const onClick = (e: React.MouseEvent) => {
    setActiveMapAssetButton(null);
    setSelectedAgentIndex(agentIndex);
    setSelectedAgentInstanceById(Number(agentId));
    e.stopPropagation();
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: () => {
      setActiveMapAssetButton(null);
      return item;
    },
    collect: (monitor) => ({
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
    <>
      <Container
        ref={drag}
        isDragging={isDragging}
        onClick={onClick}
        isSelected={isSelected}
        overflow
      >
        <AgentImage sprite={sprite} />
        {!!isSelected && <Handlers />}
      </Container>
      <AgentName>{name}</AgentName>
    </>
  );
}

interface AgentButtonProps {
  sprite: string;
}

export function AgentButton({ sprite }: AgentButtonProps) {
  const setActiveMapAssetButton = useBoardStore(
    (state) => state.setActiveMapAssetButton
  );
  const item: AgentButtonItemProps = { type: ItemTypes.AGENT_BUTTON, sprite };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: () => {
      setActiveMapAssetButton(null);
      return item;
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag} isDragging={isDragging}>
      <AgentImage sprite={sprite} />
    </Container>
  );
}

interface ContainerProps {
  isDragging: boolean;
  isSelected?: boolean;
  overflow?: boolean;
}

const Container = styled.div<ContainerProps>`
  overflow: ${({ overflow }) => (overflow ? "visible" : "hidden")};
  position: absolute;
  opacity: ${({ isDragging }) => (isDragging ? "0.5" : "1")};
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
  ${({ isSelected, theme }) =>
    isSelected ? `border: 2px solid ${theme.color.featuredSquareBorder};` : ``}
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
    top: -${({ handlerSize }) => handlerSize / 2}px;
    left: -${({ handlerSize }) => handlerSize / 2}px;
  }

  div:nth-child(2) {
    top: -${({ handlerSize }) => handlerSize / 2}px;
    right: -${({ handlerSize }) => handlerSize / 2}px;
  }

  div:nth-child(3) {
    bottom: -${({ handlerSize }) => handlerSize / 2}px;
    left: -${({ handlerSize }) => handlerSize / 2}px;
  }

  div:nth-child(4) {
    bottom: -${({ handlerSize }) => handlerSize / 2}px;
    right: -${({ handlerSize }) => handlerSize / 2}px;
  }
`;

const Handler = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.color.featuredSquareBorder};
`;

const AgentName = styled.div`
  z-index: 3;
  white-space: nowrap;
  font-weight: bolder;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: white;
  font-size: 12pt;
  user-select: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(-12pt - 12px);
  text-align: center;
`;
