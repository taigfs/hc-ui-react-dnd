import { useDrag } from "react-dnd";
import styled from "styled-components";

import { AgentImage } from "./AgentImage";
import { ItemTypes } from "../enum";
import { agentAssetsAtlas } from "../enum/AgentAssets";
import { AgentButtonItemProps, AgentItemProps } from "../interfaces/AgentItem";
import { useBoardStore } from "../state/BoardStore";

interface AgentProps {
  agentIndex: number;
  sprite: string;
  name?: string;
}

export default function Agent({
  agentIndex,
  sprite,
  name = "Agent",
}: AgentProps) {
  const item: AgentItemProps = { type: ItemTypes.AGENT, agentIndex, sprite };

  const { setActiveMapAssetButton, setSelectedAgentIndex, selectedAgentIndex } =
    useBoardStore((state) => state);

  const isSelected = agentIndex === selectedAgentIndex;

  const onClick = (e: React.MouseEvent) => {
    setActiveMapAssetButton(null);
    setSelectedAgentIndex(agentIndex);
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

  const isAtlas = agentAssetsAtlas.includes(sprite);

  return (
    <>
      <Container
        ref={drag}
        isDragging={isDragging}
        onClick={onClick}
        isSelected={isSelected}
      >
        <AgentImage sprite={sprite} isAtlas={isAtlas} />
        {!!isSelected && <Handlers />}
      </Container>
      <AgentName>{name}</AgentName>
    </>
  );
}

interface AgentButtonProps {
  sprite: string;
  isAtlas?: boolean;
}

export function AgentButton({ sprite, isAtlas }: AgentButtonProps) {
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
      <AgentImage sprite={sprite} isAtlas={isAtlas} />
    </Container>
  );
}

interface ContainerProps {
  isDragging: boolean;
  isSelected?: boolean;
}

const Container = styled.div<ContainerProps>`
  overflow: hidden;
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
  width: 100%;
  font-weight: bolder;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  color: white;
  position: absolute;
  top: -12pt;
  font-size: 12pt;
  user-select: none;
`;
