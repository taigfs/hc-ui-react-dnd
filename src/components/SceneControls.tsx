import React, { useEffect } from "react";
import { Button, Select } from "antd";
import { useAppStore } from "../state/AppStore";
import { useBoardStore } from "../state/BoardStore";
import styled from "styled-components";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { useGetStory } from "../hooks/use-story";
import { agentInstancesToAgentPositions } from "../utils/agent-instance-to-agent-position";
import { SiteLinks } from "../enum/SiteLinks";
import { useExecutionStore } from "../state/ExecutionStore";
import useLocalStories from "../hooks/use-local-stories";

const { Option } = Select;

export const SceneControls = () => {
  const { currentProject, currentStory, setCurrentStory } = useAppStore((state) => state);
  const { setIsPlaying, isPlaying, setAgentPositions } = useBoardStore();
  const { clearMessages } = useExecutionStore((state) => state);
  const { stories, getAll: getAllStories } = useLocalStories();

  useEffect(() => {
    const projectId = currentProject?.id;
    if (!projectId) { return; }
    getAllStories(projectId);
  }, [currentProject?.id]);

  // useEffect(() => {
  //   if (story) {
  //     const positions = agentInstancesToAgentPositions(story.agents);
  //     setAgentPositions(positions);
  //   }
  // }, [story]);

  const handlePlay = () => {
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
      <StyledButton type="primary" onClick={handlePlay}>
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
