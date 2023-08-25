import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../../state/AppStore';
import { SiteLinks } from '../../enum/SiteLinks';
import { useNavigate } from 'react-router-dom';
import { Scene } from '../../interfaces/Scene';
import { Story } from '../../interfaces/Story';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject, setCurrentStory, setCurrentScene, addTab } = useAppStore((state) => state);
  const navigate = useNavigate();

  let files: { id: string, type: string, name?: string }[] = [];

  if (folderName === 'stories') {
    files = currentProject?.stories?.map((story) => ({ id: story.id+``, type: 'story', name: story.name })) || [];
  } else if (folderName === 'scenes') {
    files = currentProject?.scenes?.map((scene) => ({ id: scene.id+``, type: 'scene', name: scene.name })) || [];
  } else if (folderName === 'metadata') {
    files = [
      { id: currentProject?.id+``, type: 'metadata', name: 'Agents' },
      { id: currentProject?.id+``, type: 'metadata', name: 'Nodes' },
    ];
  }

  const handleClick = (fileId: string, fileType: string) => {
    let url = '';
    let item = null;

    if (fileType === 'story') {
      item = currentProject?.stories?.find((story) => story.id === Number(fileId)) as Story;
      setCurrentStory(item);
      addTab({ type: fileType, data: item });
      url = SiteLinks.Story.replace(':id', fileId);
    } else if (fileType === 'scene') {
      item = currentProject?.scenes?.find((scene) => scene.id === Number(fileId)) as Scene;
      setCurrentScene(item);
      addTab({ type: fileType, data: item });
      url = SiteLinks.Scene.replace(':id', fileId);
    } else if (fileType === 'metadata') {
      url = SiteLinks.Metadata.replace(':id', fileId);
      addTab({ type: fileType, data: item });
    }

    navigate(url);
  };

  return (
    <div>
      {files.map((file, index) => (
        <FolderFile id={file.id} key={index} fileName={file.name || "New file"} fileType={file.type} onClick={() => handleClick(file.id, file.type)} />
      ))}
    </div>
  );
};

export default FolderFiles;
