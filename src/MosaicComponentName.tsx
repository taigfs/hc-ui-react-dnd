import React from 'react';
import FolderWindow from './components/FolderWindow/FolderWindow';
import Sheet from './components/Sheet';

const MosaicComponentName: React.FC = () => {
  return (
    <div>
      <FolderWindow />
      <Sheet />
    </div>
  );
};

export default MosaicComponentName;
