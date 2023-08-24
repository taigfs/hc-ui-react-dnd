import React from 'react';
import FolderContainer from './FolderContainer';
import styled from 'styled-components';

const FolderWindow: React.FC = () => {
  return (
    <Container>
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
  padding: 6px 0;
`;
