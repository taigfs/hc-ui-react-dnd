import React, { useState } from 'react';
import FolderTitle from './FolderTitle';
import FolderFiles from './FolderFiles';
import styled from 'styled-components';

interface FolderContainerProps {
  folderName: string;
  defaultOpen?: boolean;
}

const FolderContainer: React.FC<FolderContainerProps> = ({ folderName, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolderContainer>
      <FolderTitle folderName={folderName} isOpen={isOpen} toggleFolder={toggleFolder} />
      {isOpen && <FolderFiles folderName={folderName} />}
    </StyledFolderContainer>
  );
};

export default FolderContainer;

const StyledFolderContainer = styled.div`
  margin: 0px 0;
`;