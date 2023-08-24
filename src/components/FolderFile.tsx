import React from 'react';

interface FolderFileProps {
  fileName: string;
  fileType: string;
  onClick: () => void;
}

const FolderFile: React.FC<FolderFileProps> = ({ fileName, fileType, onClick }) => {
  return (
    <div onClick={onClick}>
      {fileName}
    </div>
  );
};

export default FolderFile;
