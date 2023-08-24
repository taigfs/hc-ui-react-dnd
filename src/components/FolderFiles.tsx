import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../state/AppStore';
import { SiteLinks } from '../enum/SiteLinks';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject } = useAppStore((state) => state);

  let files: { id: string, type: string }[] = [];

  if (folderName === 'stories') {
    files = currentProject?.stories.map((storyId: string) => ({ id: storyId, type: 'story' }));
  } else if (folderName === 'scenes') {
    files = currentProject?.scenes.map((sceneId: string) => ({ id: sceneId, type: 'scene' }));
  }

  const handleClick = (fileId: string, fileType: string) => {
    let url = '';

    if (fileType === 'story') {
      url = SiteLinks.Story.replace(':id', fileId);
    } else if (fileType === 'scene') {
      url = SiteLinks.Scene.replace(':id', fileId);
    }

    // Navigate to the URL
    window.location.href = url;
  };

  return (
    <div>
      {files.map((file, index) => (
        <FolderFile key={index} fileName={file.id} fileType={file.type} onClick={() => handleClick(file.id, file.type)} />
      ))}
    </div>
  );
};

export default FolderFiles;
