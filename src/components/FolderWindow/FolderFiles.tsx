import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../../state/AppStore';
import { SiteLinks } from '../../enum/SiteLinks';
import { useNavigate } from 'react-router-dom';
import { Scene } from '../../interfaces/Scene';
import { Story } from '../../interfaces/Story';
import { useAgentClass } from '../../hooks/use-agent-class';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject, setCurrentStory, setCurrentScene, addTab } = useAppStore((state) => state);
  const { agentClasses } = useAgentClass(currentProject?.id || 0);
  const navigate = useNavigate();

  let files: { id: string, type: string, name?: string }[] = [];

  if (folderName === 'stories') {
    files = currentProject?.stories?.map((story) => ({ id: story.id+``, type: 'story', name: story.name })) || [];
  } else if (folderName === 'scenes') {
    files = currentProject?.scenes?.map((scene) => ({ id: scene.id+``, type: 'scene', name: scene.name })) || [];
  } else if (folderName === 'metadata') {
    files = [
      { id: currentProject?.id+`?sheetTab=agents`, type: 'metadata', name: 'Agents' },
      { id: currentProject?.id+`?sheetTab=nodes`, type: 'metadata', name: 'Nodes' },
    ];
  } else if (folderName === 'data') {
    files = agentClasses.data?.map((data) => ({ id: data.id+``, type: 'data', name: data.name })) || [];
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
      // gets the sheetTab from the url and capitalize it
      const sheetTab = url.split('?')[1].split('=')[1].replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      addTab({ type: fileType, data: {id: fileId, name: sheetTab} });
    } else if (fileType === 'data') {
      item = agentClasses.data?.find((data) => data.id === Number(fileId));
      addTab({ type: fileType, data: item });
      url = SiteLinks.Data.replace(':id', fileId);
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
