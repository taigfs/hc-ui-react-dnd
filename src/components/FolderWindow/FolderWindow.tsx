import React from 'react';
import FolderContainer from './FolderContainer';
import styled from 'styled-components';
import { useAppStore } from '../../state/AppStore';
import { useNavigate } from 'react-router-dom';
import { SiteLinks } from '../../enum/SiteLinks';

const FolderWindow: React.FC = () => {
  const { currentProject } = useAppStore((state) => state);
  const navigate = useNavigate();
  const onProjectClick = () => {
    navigate(SiteLinks.Project.replace(':id', currentProject?.id?.toString() || ""));
  }
  return (
    <Container>
      <StyledH4 onClick={onProjectClick}>{currentProject?.name}</StyledH4>
      <FolderContainer folderName="scenes" defaultOpen />
      <FolderContainer folderName="stories" defaultOpen />
      <FolderContainer folderName="metadata" defaultOpen />
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
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

