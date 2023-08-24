import React from 'react';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

interface FolderTitleProps {
  folderName: string;
  isOpen: boolean;
  toggleFolder: () => void;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ folderName, isOpen, toggleFolder }) => {
  return (
    <div onClick={toggleFolder}>
      {isOpen ? <CaretDownOutlined /> : <CaretRightOutlined />}
      {folderName}
    </div>
  );
};

export default FolderTitle;
