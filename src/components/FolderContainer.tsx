import React, { useState } from 'react';
import FolderTitle from './FolderTitle';
import FolderFiles from './FolderFiles';

interface FolderContainerProps {
  folderName: string;
}

const FolderContainer: React.FC<FolderContainerProps> = ({ folderName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FolderTitle folderName={folderName} isOpen={isOpen} toggleFolder={toggleFolder} />
      {isOpen && <FolderFiles folderName={folderName} />}
    </div>
  );
};

export default FolderContainer;
