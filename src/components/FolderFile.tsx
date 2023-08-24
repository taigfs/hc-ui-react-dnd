import React from 'react';
import styled from 'styled-components';
import { FileOutlined, FileTextOutlined } from '@ant-design/icons';

interface FolderFileProps {
  fileName: string;
  fileType: string;
  onClick: () => void;
}

const FolderFile: React.FC<FolderFileProps> = ({ fileName, fileType, onClick }) => {
  const getFileIcon = () => {
    switch (fileType) {
      case 'story':
        return <FileTextOutlined />;
      case 'scene':
        return <FileOutlined />;
      default:
        return null;
    }
  };

  return (
    <StyledFolderFile onClick={onClick}>
      {getFileIcon()}
      <FileName>{fileName}</FileName>
    </StyledFolderFile>
  );
};

export default FolderFile;

const StyledFolderFile = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  margin: 4px 0;

  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

const FileName = styled.span`
  margin-left: 6px;
`;

