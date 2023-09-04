import React, { useEffect, useState } from 'react';
import Sheet from './Sheet';
import { useAppStore } from '../../state/AppStore';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAgentClass } from '../../hooks/use-agent-class';
import { agentClassSchemaToHandsontableData } from '../../utils/agent-class-schema-to-handsontable-data';
import { useGetStory } from '../../hooks/use-story';

export const DataSheet: React.FC = () => {
  const { currentProject, currentStory } = useAppStore((state) => state);
  const { agentClasses } = useAgentClass(currentProject?.id || 0);
  const { data: story, refetch: refetchStory } = useGetStory(currentStory?.id || 0, false);
  const [handsontableData, setHandsontableData] = useState<any[][]>([]);

  const { id } = useParams();

  const currentAgentClass = agentClasses.data?.find((data) => data.id === Number(id));
  const title = `${currentAgentClass?.name}`;

  useEffect(() => {
    if (!agentClasses.data?.length) {
      agentClasses.refetch();
    }
  }, [agentClasses.data]);

  useEffect(() => {
    if (!story) {
      refetchStory();
    }
  }, [story]);

  useEffect(() => {
    if (currentAgentClass && story?.id) {
      const agentInstances = story.agents?.filter((agent) => agent.agentClassId === currentAgentClass.id) || [];
      setHandsontableData(agentClassSchemaToHandsontableData(currentAgentClass.schema, agentInstances));
    }
  }, [currentAgentClass, story?.agents]);

  return (
    <>
      <Title>{title}</Title>
      <Sheet type="metadata" entity={currentAgentClass?.name || 'data'} handsontableData={handsontableData} />
    </>
  );
};

const Title = styled.div`
  font-weight: 600;
  padding: 8px;
  background: #0d0d0d;/* background: ${(props) => props.theme.color.squareBg}; */
  border: 1px solid ${(props) => props.theme.color.squareBorder};
`;