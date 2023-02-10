import styled from "styled-components";
import { MapAssetRange } from "../../interfaces/MapAssetRange";
import { useBoardStore } from "../../state/store";

interface AssetSizeButtonProps {
  size: number;
}

export const AssetSizeButton = ({ size }: AssetSizeButtonProps) => {
  const { activeMapAssetRange, setActiveMapAssetRange } = useBoardStore((state) => state);

  const onClick = () => setActiveMapAssetRange(size as MapAssetRange);

  const squares = [];
  for (let i = 0; i<Math.pow(size, 2); i++) { squares.push(<Square key={i} />); }

  return (
    <Wrapper active={size === activeMapAssetRange} onClick={onClick}>
      <Container size={size}>
        { squares }
      </Container>
    </Wrapper>
  );
}

interface ContainerProps {
  size: number;
}

interface WrapperProps {
  active: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  cursor: pointer;
  border: 2px solid ${({ theme, active }) => active ? theme.color.featuredSquareBorder : theme.color.squareBorder};
  width: 24px;
  height: 24px;
  border-radius: 2.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
  padding-top: 1px;
`;

const Container = styled.div<ContainerProps>`
  width: ${({ size }) => `calc(${size * 5}px + ${size * 1}px)`};
  height: ${({ size }) => `calc(${size * 5}px + ${size * 1}px)`};
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin-right: 1px;
    margin-bottom: 1px;
  }
`;

const Square = styled.div`
  height: 5px;
  width: 5px;
  background-color: ${({ theme }) => theme.color.squareBorder};
`;