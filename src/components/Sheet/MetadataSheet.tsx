import React, { useEffect } from 'react';
import Sheet from './Sheet';
import { useAppStore } from '../../state/AppStore';
import styled from 'styled-components';
import { agentInstancesToHandsontableData } from '../../utils/agent-instances-to-handsontable-data';
import { nodeInstancesToHandsontableData } from '../../utils/node-instances-to-handsontable-data';
import { useLocalAgents } from '../../hooks/use-local-agents';
import { useLocalNodes } from '../../hooks/use-local-nodes';

const MetadataSheet: React.FC = () => {
  const { currentStory } = useAppStore((state) => state);
  const { agents, getAll: getAllAgents } = useLocalAgents();
  const { nodes, getAll: getAllNodes } = useLocalNodes();

  useEffect(() => {
    if (!currentStory?.id) { return; }
    getAllAgents(currentStory.id);
    getAllNodes(currentStory.id);
  }, [currentStory?.id]);

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

  if (sheetTab === 'agents') {
    handsontableData = agentInstancesToHandsontableData(agents || []);
  } else if (sheetTab === 'nodes') {
    handsontableData = nodeInstancesToHandsontableData(nodes || []);
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