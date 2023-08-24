import React from 'react';
import FolderContainer from './FolderContainer';
import styled from 'styled-components';
import { useAppStore } from '../../state/AppStore';

const FolderWindow: React.FC = () => {
  const { currentProject } = useAppStore((state) => state);
  return (
    <Container>
      <StyledH4>{currentProject?.name}</StyledH4>
      <FolderContainer folderName="stories" defaultOpen />
      <FolderContainer folderName="scenes" defaultOpen />
      <FolderContainer folderName="metadata" />
      <FolderContainer folderName="data" />
      <FolderContainer folderName="interface" />
    </Container>
  );
};

export default FolderWindow;

const Container = styled.div`
  padding: 0 8px 8px;
  overflow-y: auto;
`;

const StyledH4 = styled.h4`
  position: sticky;
  top: 0;
  background-color: #151515;
  z-index: 10;
  padding: 8px 0 4px;
`;

