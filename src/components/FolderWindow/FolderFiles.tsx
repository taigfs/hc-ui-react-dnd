import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../../state/AppStore';
import { SiteLinks } from '../../enum/SiteLinks';
import { useNavigate } from 'react-router-dom';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject } = useAppStore((state) => state);
  const navigate = useNavigate();

  let files: { id: string, type: string, name?: string }[] = [];

  if (folderName === 'stories') {
    files = currentProject?.stories?.map((story) => ({ id: story.id+``, type: 'story', name: story.name })) || [];
  } else if (folderName === 'scenes') {
    files = currentProject?.scenes?.map((scene) => ({ id: scene.id+``, type: 'scene', name: scene.name })) || [];
  }

  const handleClick = (fileId: string, fileType: string) => {
    let url = '';

    if (fileType === 'story') {
      url = SiteLinks.Story.replace(':id', fileId);
    } else if (fileType === 'scene') {
      url = SiteLinks.Scene.replace(':id', fileId);
    }

    // Navigate to the URL
    navigate(url);
  };

  return (
    <div>
      {files.map((file, index) => (
        <FolderFile key={index} fileName={file.name || "New file"} fileType={file.type} onClick={() => handleClick(file.id, file.type)} />
      ))}
    </div>
  );
};

export default FolderFiles;
