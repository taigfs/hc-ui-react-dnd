import styled from "styled-components";

interface AssetSizeButtonProps {
  size: number;
}

export const AssetSizeButton = ({ size }: AssetSizeButtonProps) => {
  const squares = [];
  for (let i = 0; i<Math.pow(size, 2); i++) { squares.push(<Square/>); }
  return (
    <Container size={size}>
      { squares }
    </Container>
  );
}

interface ContainerProps {
  size: number;
}
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