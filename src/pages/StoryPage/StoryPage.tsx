import React, { useEffect } from 'react';
import { MosaicNode } from 'react-mosaic-component';

import { HCDock } from '../../components/HCDock';
import { useWindowStore } from '../../state/WindowStore';
import { MOSAIC_COMPONENT_NAME } from '../../enum/MosaicComponentName';
import { SceneControls } from '../../components/SceneControls';
import { HCTabs } from '../../components/HCTabs';
import styled from 'styled-components';
import { Layout } from 'antd';
import { HCFooter } from '../../components/HCFooter';
import { HCHeader } from '../../components/HCHeader';
import { useGetStory } from '../../hooks/use-story';
import { useDiagramStore } from '../../state/DiagramStore';
import { useAppStore } from '../../state/AppStore';
import { storyInstanceToReactFlowStory } from '../../utils/story-instance-to-react-flow-story';

export function StoryPage() {
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);
  const { currentProject, currentStory } = useAppStore((state) => state);

  const { data: story, refetch } = useGetStory(currentStory?.id || 0);
  const { setNodes, setEdges, setAgents } = useDiagramStore();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (story) {
      const { nodes, edges } = storyInstanceToReactFlowStory(story);
      setNodes(nodes);
      setEdges(edges);
      setAgents(story.agents);
    }
  }, [story]);

  useEffect(() => {
    setMosaicNodes({
      direction: 'row',
      first: {
        direction: 'row',
        splitPercentage: 20,
        first: MOSAIC_COMPONENT_NAME.STORY_TOOLBAR,
        second: MOSAIC_COMPONENT_NAME.STORY_DIAGRAM,
      },
      second: MOSAIC_COMPONENT_NAME.STORY_EDIT_NODE,
      splitPercentage: 80,
    } as MosaicNode<string>);
  }, []);
  
  
  return (
    <Layout>
      <StyledHeader>
        <HCHeader />
      </StyledHeader>
      <TabsAndControlsContainer>
        <HCTabs />
        <SceneControls />
      </TabsAndControlsContainer>
      <HCDock initialValue={mosaicNodes} />
      <StyledHCFooter />
    </Layout>
  );
}

const TabsAndControlsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
`;

const StyledHeader = styled(Layout.Header)`
  height: 48px;
  background-color: ${(props) => props.theme.color.squareBg};
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
  padding-inline: 16px;
`;

const StyledHCFooter = styled(HCFooter)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
