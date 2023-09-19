import React, { useEffect } from "react";
import { Button, Select } from "antd";
import { useAppStore } from "../state/AppStore";
import { useBoardStore } from "../state/BoardStore";
import styled from "styled-components";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { agentInstancesToAgentPositions } from "../utils/agent-instance-to-agent-position";
import { SiteLinks } from "../enum/SiteLinks";
import useLocalStories from "../hooks/use-local-stories";
import { useLocalExecution } from "../hooks/use-local-execution";

const { Option } = Select;

export const SceneControls = () => {
  const { currentProject, currentStory, setCurrentStory } = useAppStore((state) => state);
  const { setIsPlaying, isPlaying, setAgentPositions } = useBoardStore();
  const { clearCurrentExecutionLogs: clearMessages } = useLocalExecution();
  const { stories, agents, getAll: getAllStories, getAllAgents } = useLocalStories();

  useEffect(() => {
    const projectId = currentProject?.id;
    if (!projectId) { return; }
    getAllStories(projectId);
  }, [currentProject?.id]);

  useEffect(() => {
    if (currentStory?.id) {
      getAllAgents(currentStory.id);
      const positions = agentInstancesToAgentPositions(agents);
      setAgentPositions(positions);
    }
  }, [currentStory?.id]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    clearMessages();
    setIsPlaying(true);
  };

  const handleStoryChange = (value: string) => {
    const newCurrentStory = stories.find((story) => story.id === value);
    if(newCurrentStory) {
      setCurrentStory(newCurrentStory);
    }
  };

  if(!location.pathname.startsWith(SiteLinks.Scenes)) {
    return null;
  }

  return (
    <Container>
      <StyledButton type="primary" onClick={handleTogglePlay} disabled={!currentStory?.id}>
        { !isPlaying ? <CaretRightOutlined /> : <PauseOutlined /> }
      </StyledButton>
      <Select value={currentStory?.id || ""} style={{ width: 200 }} onChange={handleStoryChange}>
        <Option value="">Select a story</Option>
        {stories.map((story) => (
          <Option key={story.id} value={story.id}>
            {story.name}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

const StyledButton = styled(Button)`
  margin-right: 4px;
`;

const Container = styled.div`
  padding: 0 4px;
}`;
