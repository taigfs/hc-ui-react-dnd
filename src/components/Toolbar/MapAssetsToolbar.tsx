// src/components/Toolbar/MapAssetsToolbar.tsx
import React from "react";
import styled from "styled-components";
import { useGetMapAssetSprites } from "../../hooks/use-scene";

import { AssetSizeButton } from "./AssetSizeButton";
import {
  ButtonsContainer,
  StyledToolbarButton,
  ToolbarContainer,
} from "./styles";
import { mapAssets } from "../../enum/MapAssets";
import { MapAssetButton } from "../MapAsset";

export const MapAssetsToolbar: React.FC = () => {
  const { data: mapAssetSprites } = useGetMapAssetSprites();

  return (
    <ToolbarContainer>
      <AssetSizeButtonsContainer>
        <h4 style={{ flex: 1 }}>Map Assets</h4>
        <AssetSizeButton size={1} />
        <AssetSizeButton size={2} />
        <AssetSizeButton size={3} />
      </AssetSizeButtonsContainer>
      <ButtonsContainer>
        {mapAssetSprites && mapAssetSprites.map((sprite: any) => {
          const asset = `${sprite.id}`;
          return (
            <StyledToolbarButton key={sprite.id} id={asset}>
              <MapAssetButton sprite={asset} />
            </StyledToolbarButton>
          );
        })}
      </ButtonsContainer>
    </ToolbarContainer>
  );
};

const AssetSizeButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.color.squareBg};
  z-index: 10;
  padding-top: 16px;
  padding-bottom: 8px;
  
  & > div {
    margin-right: 5px;
  }
};
