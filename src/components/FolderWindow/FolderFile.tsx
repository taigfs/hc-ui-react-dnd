import React from 'react';
import styled from 'styled-components';
import { FileImageOutlined, PlaySquareOutlined, CloudOutlined, CloudFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { SiteLinks } from '../../enum/SiteLinks';

interface FolderFileProps {
  fileName: string;
  fileType: string;
  id: string;
  onClick: () => void;
}

const FolderFile: React.FC<FolderFileProps> = ({ fileName, fileType, id, onClick }) => {
  const location = useLocation();
  
  const getUrl = () => {
    switch (fileType) {
      case 'story':
        return SiteLinks.Story.replace(':id', id);
      case 'scene':
        return SiteLinks.Scene.replace(':id', id);
      case 'metadata':
        return SiteLinks.Metadata.replace(':id', id);
      case 'data':
        return SiteLinks.Data.replace(':id', id);
      default:
        return '';
    }
  }

  const getFileIcon = () => {
    switch (fileType) {
      case 'story':
        return <PlaySquareOutlined style={{ fontSize: 10 }} />;
      case 'scene':
        return <FileImageOutlined style={{ fontSize: 10 }} />;
      case 'metadata':
        return <CloudOutlined style={{ fontSize: 10 }} />;
      case 'data':
        return <CloudFilled style={{ fontSize: 10 }} />;
      default:
        return null;
    }
  };

  const fullPath = window.location.pathname + window.location.search;
  const isSelected = fullPath.includes(getUrl());

  return (
    <StyledFolderFile onClick={onClick} isSelected={isSelected}>
      {getFileIcon()}
      <FileName>{fileName}</FileName>
    </StyledFolderFile>
  );
};

export default FolderFile;

const StyledFolderFile = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 0 4px 12px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? props.theme.color.featuredSquareBg : 'transparent')};

  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

const FileName = styled.span`
  margin-left: 6px;
`