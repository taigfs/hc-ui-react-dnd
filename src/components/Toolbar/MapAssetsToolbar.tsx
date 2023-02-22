import React from "react";
import styled from "styled-components";

import { AssetSizeButton } from "./AssetSizeButton";
import {
  ButtonsContainer,
  StyledToolbarButton,
  ToolbarContainer,
} from "./styles";
import { mapAssets } from "../../enum/MapAssets";
import { MapAssetButton } from "../MapAsset";

export const MapAssetsToolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <AssetSizeButtonsContainer>
        <h4 style={{ flex: 1 }}>Map Assets</h4>
        <AssetSizeButton size={1} />
        <AssetSizeButton size={2} />
        <AssetSizeButton size={3} />
      </AssetSizeButtonsContainer>
      <ButtonsContainer>
        {mapAssets.map((key) => {
          const asset = `${key}`;
          return (
            <StyledToolbarButton key={key} id={asset}>
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
  & > div {
    margin-right: 5px;
  }
`;
