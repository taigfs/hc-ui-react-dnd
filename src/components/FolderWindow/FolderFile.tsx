import React from 'react';
import styled from 'styled-components';
import { FileImageOutlined, FileOutlined, FileTextOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

interface FolderFileProps {
  fileName: string;
  fileType: string;
  id: string;
  onClick: () => void;
}

const FolderFile: React.FC<FolderFileProps> = ({ fileName, fileType, id, onClick }) => {
  const location = useLocation();

  const getFileIcon = () => {
    switch (fileType) {
      case 'story':
        return <PlaySquareOutlined style={{ fontSize: 10 }} />;
      case 'scene':
        return <FileImageOutlined style={{ fontSize: 10 }} />;
      default:
        return null;
    }
  };

  const isSelected = location.pathname.includes(`sitelinks/${id}`);

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
  padding-left: 12px;
  cursor: pointer;
  margin: 4px 0;
  background-color: ${(props) => (props.isSelected ? props.theme.color.featuredSquareBg : 'transparent')};

  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

const FileName = styled.span`
  margin-left: 6px;
};
