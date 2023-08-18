import React, { useEffect } from 'react';
import { useGetStory } from '../hooks/useGetStory';
import { useDiagramStore } from '../state/DiagramStore';
import { storyInstanceToReactFlowStory } from '../utils/story-instance-to-react-flow-story';

const StoryPage: React.FC = () => {
  const { story } = useGetStory();
  const { setNodes, setEdges } = useDiagramStore();

  useEffect(() => {
    if (story) {
      const { nodes, edges } = storyInstanceToReactFlowStory(story);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [story, setNodes, setEdges]);

  return (
    <div>
      {/* Your StoryPage content */}
    </div>
  );
};

export default StoryPage;
