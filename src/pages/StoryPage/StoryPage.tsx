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
import { instancesToReactFlowElements } from '../../utils/instances-to-react-flow-elements';
import { useLocalNodes } from '../../hooks/use-local-nodes';
import { useLocalEdges } from '../../hooks/use-local-edges';
import { useLocalAgents } from '../../hooks/use-local-agents';
import { useLocalAgentClasses } from '../../hooks/use-local-agent-classes';

export function StoryPage() {
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);
  const { currentProject, currentStory } = useAppStore((state) => state);
  const { nodes, getAll: getAllNodes } = useLocalNodes();
  const { edges, getAll: getAllEdges } = useLocalEdges();
  const { getAll: getAllAgents } = useLocalAgents();
  const { getAll: getAllAgentClasses } = useLocalAgentClasses();

  const { setNodes, setEdges } = useDiagramStore();

  useEffect(() => {
    if (currentStory?.id && currentProject?.id) {
      getAllNodes(currentStory?.id);
      getAllEdges(currentStory?.id);
      getAllAgents(currentStory?.id);
      getAllAgentClasses(currentProject?.id);
    }
  }, [currentStory?.id]);

  useEffect(() => {
    if (currentStory?.id) {
      const { nodes: rfNodes, edges: rfEdges } = instancesToReactFlowElements(nodes, edges);
      setNodes(rfNodes);
      setEdges(rfEdges);
    }
  }, [nodes, edges]);

  useEffect(() => {
    setMosaicNodes({
      direction: 'row',
      first: {
        direction: 'row',
        splitPercentage: 35,
        first: {
          direction: 'row',
          first: MOSAIC_COMPONENT_NAME.FOLDER_EXPLORER,
          second: MOSAIC_COMPONENT_NAME.STORY_TOOLBAR,
          splitPercentage: 50
        },
        second: {
          direction: 'column',
          first: MOSAIC_COMPONENT_NAME.STORY_DIAGRAM,
          second: MOSAIC_COMPONENT_NAME.CONSOLE,
          splitPercentage: 70,
        },
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
