import { useDrag } from "react-dnd"
import styled from "styled-components";
import { ItemTypes } from "../enum"

export default function Knight() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
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