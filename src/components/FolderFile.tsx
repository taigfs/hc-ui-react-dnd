import React from 'react';

interface FolderFileProps {
  fileName: string;
}

const FolderFile: React.FC<FolderFileProps> = ({ fileName }) => {
  const handleClick = () => {
    // Handle click logic here
  };

  return (
    <div onClick={handleClick}>
      {fileName}
    </div>
  );
};

export default FolderFile;
