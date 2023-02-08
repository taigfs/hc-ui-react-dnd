import styled from "styled-components";
import { MapAssetSprite } from "../enum";

interface MapAssetProps {
  sprite: MapAssetSprite;
}

export function MapAsset ({ sprite }: MapAssetProps) {
  return <Container sprite={sprite}/>
}

export function MapAssetButton ({ sprite }: MapAssetProps) {
  return <Container sprite={sprite}/>
}

interface ContainerProps {
  sprite: MapAssetSprite;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({ sprite }) => {
    switch (sprite) {
      case MapAssetSprite.BLUE_LAND: return '#0077BE';
      case MapAssetSprite.BROWN_LAND: return '#A52A2A';
      case MapAssetSprite.GREEN_LAND: return '#228B22';
      case MapAssetSprite.YELLOW_LAND: return '#FEE357';
      default:
        return 'transparent';
    }
  }};
`;