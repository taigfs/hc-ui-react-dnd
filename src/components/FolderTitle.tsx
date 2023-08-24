import React from 'react';
import styled from 'styled-components';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

interface FolderTitleProps {
  folderName: string;
  isOpen: boolean;
  toggleFolder: () => void;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ folderName, isOpen, toggleFolder }) => {
  return (
    <StyledFolderTitle onClick={toggleFolder}>
      {isOpen ? <CaretDownOutlined /> : <CaretRightOutlined />}
      {folderName}
    </StyledFolderTitle>
  );
};

export default FolderTitle;

const StyledFolderTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 3px;

  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }

  & > * {
    margin-right: 5px;
  }
`;
