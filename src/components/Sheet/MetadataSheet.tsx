import React, { useEffect } from 'react';
import Sheet from './Sheet';
import { useAppStore } from '../../state/AppStore';
import styled from 'styled-components';
import { agentInstancesToHandsontableData } from '../../utils/agent-instances-to-handsontable-data';
import { useGetStory } from '../../hooks/use-story';

const MetadataSheet: React.FC = () => {
  const { currentStory } = useAppStore((state) => state);
  const { refetch, data: story } = useGetStory(currentStory?.id || 0);

  // get the sheetTab from the url
  const sheetTab = window.location.search.split('=')[1];

  // useEffect(() => {
  //   refetch();
  // }, [currentStory?.id]);

  let handsontableData: any[] = [];

  console.log(currentStory);
  if (currentStory === null) {
    return (
      <Container>
        Please select a story first.
      </Container>
    );
  }

  console.log(sheetTab);
  if (sheetTab === 'agents') {
    const data = agentInstancesToHandsontableData(story?.agents || []);
    handsontableData = data;
    console.log(data);
  }

  return (
    <>
      <Title>Story: {currentStory.name}</Title>
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
  background: ${(props) => props.theme.color.squareBg};
  border: 1px solid ${(props) => props.theme.color.squareBorder};
  font-size: 12px;
`;