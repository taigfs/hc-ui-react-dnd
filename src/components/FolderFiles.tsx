import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../state/AppStore';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject } = useAppStore((state) => state);

  let files: string[] = [];

  if (folderName === 'stories') {
    files = currentProject?.stories;
  } else if (folderName === 'scenes') {
    files = currentProject?.scenes;
  }

  return (
    <div>
      {files.map((file, index) => (
        <FolderFile key={index} fileName={file} />
      ))}
    </div>
  );
};

export default FolderFiles;
