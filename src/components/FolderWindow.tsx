import React from 'react';
import FolderContainer from './FolderContainer';

const FolderWindow: React.FC = () => {
  return (
    <div>
      <FolderContainer folderName="stories" defaultOpen />
      <FolderContainer folderName="scenes" defaultOpen />
      <FolderContainer folderName="metadata" />
      <FolderContainer folderName="data" />
      <FolderContainer folderName="interface" />
    </div>
  );
};

export default FolderWindow;
