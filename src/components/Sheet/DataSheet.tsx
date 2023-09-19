import React, { useEffect, useState } from 'react';
import Sheet from './Sheet';
import { useAppStore } from '../../state/AppStore';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { agentClassSchemaToHandsontableData } from '../../utils/agent-class-schema-to-handsontable-data';
import { useLocalAgentClasses } from '../../hooks/use-local-agent-classes';
import { useLocalAgents } from '../../hooks/use-local-agents';

export const DataSheet: React.FC = () => {
  const { currentStory, setCurrentAgentClass } = useAppStore((state) => state);
  const { agentClasses } = useLocalAgentClasses();
  const { agents, getAll: getAllAgents } = useLocalAgents();
  const [handsontableData, setHandsontableData] = useState<any[][]>([]);

  const { id } = useParams();

  const agentClass = agentClasses.find((data) => data.id === id);
  const title = `${agentClass?.name}`;

  useEffect(() => {
    if (agentClass && currentStory?.id) {
      setCurrentAgentClass(agentClass);
      const agentInstances = agents.filter((agent) => agent.agentClassId === agentClass.id);
      setHandsontableData(agentClassSchemaToHandsontableData(agentClass.schema, agentInstances));
    }
  }, [agentClass, agents]);

  useEffect(() => {
    if (currentStory?.id) {
      getAllAgents(currentStory.id);
    }
  }, [currentStory?.id]);

  if (currentStory === null) {
    return (
      <Container>
        Please select a story first.
      </Container>
    );
  }

  if (handsontableData.length <= 1) {
    return (
      <Container>
        There are no instances of this agent class in this story.
      </Container>
    );
  }

  return (
    <>
      <Title>{title}</Title>
      <Sheet type="metadata" entity={agentClass?.name || 'data'} handsontableData={handsontableData} />
    </>
  );
};

const Title = styled.div`
  font-weight: 600;
  padding: 8px;
  background: #0d0d0d;/* background: ${(props) => props.theme.color.squareBg}; */
  border: 1px solid ${(props) => props.theme.color.squareBorder};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;