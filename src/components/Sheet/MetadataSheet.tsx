import React, { useEffect } from 'react';
import Sheet from './Sheet';
import { useAppStore } from '../../state/AppStore';
import styled from 'styled-components';
import { agentInstancesToHandsontableData } from '../../utils/agent-instances-to-handsontable-data';
import { useGetStory } from '../../hooks/use-story';
import { nodeInstancesToHandsontableData } from '../../utils/node-instances-to-handsontable-data';

const MetadataSheet: React.FC = () => {
  const { currentStory } = useAppStore((state) => state);
  const { data: story } = useGetStory(currentStory?.id || 0);

  // get the sheetTab from the url
  const sheetTab = window.location.search.split('=')[1];
  const title = sheetTab?.replace(/(^|\s)\S/g, (l) => l.toUpperCase());

  let handsontableData: any[] = [];

  if (currentStory === null) {
    return (
      <Container>
        Please select a story first.
      </Container>
    );
  }

  console.log(sheetTab);
  if (sheetTab === 'agents') {
    handsontableData = agentInstancesToHandsontableData(story?.agents || []);
  } else if (sheetTab === 'nodes') {
    handsontableData = nodeInstancesToHandsontableData(story?.nodes || []);
  }

  return (
    <>
      <Title>{title}: {currentStory.name}</Title>
      <Sheet type="metadata" entity={sheetTab} handsontableData={handsontableData} />
    </>
  );
};

export default MetadataSheet;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled.div`
  font-weight: 600;
  padding: 8px;
  background: #0d0d0d;/* background: ${(props) => props.theme.color.squareBg}; */
  border: 1px solid ${(props) => props.theme.color.squareBorder};
`;