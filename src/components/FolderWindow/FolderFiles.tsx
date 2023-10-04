import React from 'react';
import FolderFile from './FolderFile';
import { useAppStore } from '../../state/AppStore';
import { SiteLinks } from '../../enum/SiteLinks';
import { useNavigate } from 'react-router-dom';
import { Scene } from '../../interfaces/Scene';
import { Story } from '../../interfaces/Story';
import { useLocalAgentClasses } from '../../hooks/use-local-agent-classes';
import useLocalScenes from '../../hooks/use-local-scenes';
import useLocalStories from '../../hooks/use-local-stories';

interface FolderFilesProps {
  folderName: string;
}

const FolderFiles: React.FC<FolderFilesProps> = ({ folderName }) => {
  const { currentProject, setCurrentStory, setCurrentScene, addTab } = useAppStore((state) => state);
  const { agentClasses } = useLocalAgentClasses();
  const { scenes } = useLocalScenes();
  const { stories } = useLocalStories();
  const navigate = useNavigate();

  let files: { id: string, type: string, name?: string }[] = [];

  if (folderName === 'stories') {
    files = stories?.map((story) => ({ id: story.id+``, type: 'story', name: story.name })) || [];
  } else if (folderName === 'scenes') {
        files = scenes?.map((scene) => ({ id: scene.id+``, type: 'scene', name: scene.name })) || [];
  } else if (folderName === 'metadata') {
    files = [
      { id: currentProject?.id+`?sheetTab=agents`, type: 'metadata', name: 'Agents' },
      { id: currentProject?.id+`?sheetTab=nodes`, type: 'metadata', name: 'Nodes' },
    ];
  } else if (folderName === 'data') {
    files = agentClasses?.map((data) => ({ id: data.id+``, type: 'data', name: `${data.name} #${data.id}` })) || [];
  } else if (folderName === 'knowledge-base') {
    files = [
      { id: '1', type: 'knowledge-base', name: 'Strategy Graph' },
    ];
  }

  const handleClick = (fileId: string, fileType: string) => {
    let url = '';
    let item = null;

    if (fileType === 'story') {
      item = stories?.find((story) => story.id === fileId) as Story;
      setCurrentStory(item);
      addTab({ type: fileType, data: item });
      url = SiteLinks.Story.replace(':id', fileId);
    } else if (fileType === 'scene') {
      item = scenes?.find((scene) => scene.id === fileId) as Scene;
      setCurrentScene(item);
      addTab({ type: fileType, data: item });
      url = SiteLinks.Scene.replace(':id', fileId);
    } else if (fileType === 'metadata') {
      url = SiteLinks.Metadata.replace(':id', fileId);
      // gets the sheetTab from the url and capitalize it
      const sheetTab = url.split('?')[1].split('=')[1].replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      addTab({ type: fileType, data: {id: fileId, name: sheetTab} });
    } else if (fileType === 'data') {
      item = agentClasses?.find((data) => data.id === fileId);
      addTab({ type: fileType, data: item });
      url = SiteLinks.Data.replace(':id', fileId);
    } else if (fileType === 'knowledge-base') {
      url = SiteLinks.KnowledgeBase.replace(':id', fileId);
      // addTab({ type: fileType, data: {id: fileId, name: 'Interface'} });
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
