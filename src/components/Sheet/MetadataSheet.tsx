import React from 'react';
import { useSelector } from 'react-redux';
import Sheet from './Sheet';
import { RootState } from '../../store';

const MetadataSheet: React.FC = () => {
  const currentStory = useSelector((state: RootState) => state.story.currentStory);
  const agentInstances = useSelector((state: RootState) => state.agent.agentInstances);
  const nodes = useSelector((state: RootState) => state.node.nodes);

  let s = '';

  if (currentStory === null) {
    if (type === 'agents') {
      s = 'Please select a story first.';
    } else if (type === 'nodes') {
      s = 'Please select a story first.';
    }
  }

  return (
    <Sheet type="metadata" s={s} />
  );
};

export default MetadataSheet;
