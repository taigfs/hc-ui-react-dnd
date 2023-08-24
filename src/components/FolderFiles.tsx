import React from 'react';
import FolderFile from './FolderFile';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  // Replace the following lines with the actual hooks to get the files
  const files: string[] = [];

  return (
    <div>
      {files.map((file, index) => (
        <FolderFile key={index} fileName={file} />
      ))}
    </div>
  );
};

export default FolderFiles;
