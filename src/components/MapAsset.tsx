import styled from "styled-components";

import { getMapAssetSpritePath } from "../enum/MapAssets";

interface MapAssetProps {
  sprite: string;
  priority?: number;
}

export function MapAsset({ sprite, priority }: MapAssetProps) {
  return <Container sprite={sprite} priority={priority} />;
}

export function MapAssetButton({ sprite }: MapAssetProps) {
  return <Container sprite={sprite} />;
}

interface ContainerProps {
  sprite: string;
  priority?: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: ${({ priority }) => priority || 1};
  ${({ sprite }) => {
    return `background: url(${getMapAssetSpritePath(sprite)});`;
  }};
`;
