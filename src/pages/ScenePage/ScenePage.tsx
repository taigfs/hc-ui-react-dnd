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
import { useAppStore } from '../../state/AppStore';
import { useDiagramStore } from '../../state/DiagramStore';
import { useGetStory } from '../../hooks/use-story';

export function ScenePage() {
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);
  const { currentStory } = useAppStore((state) => state);
  const { setAgents } = useDiagramStore((state) => state);

  // const { data: story, refetch } = useGetStory(currentStory?.id || 0, false);
  
  useEffect(() => {
    console.log(currentStory);
    if (currentStory) {
      // setAgents(story.agents || []);
    } else {
      // refetch();
    }
  }, [currentStory]);

  useEffect(() => {
    setMosaicNodes({
      direction: 'row',
      first: {
        direction: 'row',
        splitPercentage: 35,
        first: {
          direction: 'row',
          first: MOSAIC_COMPONENT_NAME.FOLDER_EXPLORER,
          second: MOSAIC_COMPONENT_NAME.SCENE_TOOLBAR,
          splitPercentage: 50
        },
        second: MOSAIC_COMPONENT_NAME.BOARD,
      },
      second: {
        direction: 'column',
        first: MOSAIC_COMPONENT_NAME.EDIT_AGENT_INSTANCE,
        second: MOSAIC_COMPONENT_NAME.CONSOLE,
        splitPercentage: 50,
      },
      splitPercentage: 82,
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
