import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { HCTabs } from '../components/HCTabs';
import { HCDock } from '../components/HCDock';
import { HCFooter } from '../components/HCFooter';
import { HCHeader } from '../components/HCHeader';
import { MosaicNode } from 'react-mosaic-component';
import { MOSAIC_COMPONENT_NAME } from '../enum/MosaicComponentName';
import { useWindowStore } from '../state/WindowStore';

export const SheetPage: React.FC = () => {

  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

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
      </TabsAndControlsContainer>
      <HCDock initialValue={mosaicNodes} />
      <StyledHCFooter />
    </Layout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

const StyledHeader = styled(Layout.Header)`
  height: 48px;
  background-color: ${(props) => props.theme.color.squareBg};
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
  padding-inline: 16px;
`;

const TabsAndControlsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
`;

const StyledHCFooter = styled(HCFooter)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;