import React from 'react';
import { MapAssetSprite } from '../../enum';
import { MapAssetButton } from '../MapAsset';
import { ButtonsContainer, StyledToolbarButton, ToolbarContainer } from './styles';

export const MapAssetsToolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <h4>Map Assets</h4>
      <ButtonsContainer>
        { Object.keys(MapAssetSprite).map((key) => {
          const asset: MapAssetSprite = MapAssetSprite[key as keyof typeof MapAssetSprite];
          return (
            <StyledToolbarButton key={key} id={asset}>
              <MapAssetButton sprite={asset} />
            </StyledToolbarButton>
          );
        })}
      </ButtonsContainer>
    </ToolbarContainer>
  );
}