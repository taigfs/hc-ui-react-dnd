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
  padding-left: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FileName = styled.span`
  margin-left: 10px;
`;

