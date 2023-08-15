import React, { useEffect } from "react";
import { Button, Select } from "antd";
import { useAppStore } from "../state/AppStore";
import { useBoardStore } from "../state/BoardStore";
import styled from "styled-components";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { useGetStory } from "../hooks/use-story";
import { agentInstanceToAgentPosition } from "../utils/agent-instance-to-agent-position";

const { Option } = Select;

export const SceneControls = () => {
  const { currentProject, currentStory, setCurrentStory } = useAppStore((state) => state);
  const { setIsPlaying, isPlaying, setAgentPositions } = useBoardStore();
  const { data: story } = useGetStory(currentStory?.id || 0);

  useEffect(() => {
    if (story) {
      const positions = agentInstanceToAgentPosition(story.agents);
      setAgentPositions(positions);
    }
  }, [story]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStoryChange = (value: string) => {
    const newCurrentStory = currentProject?.stories?.find((story) => story.id === Number(value));
    if(newCurrentStory) {
      setCurrentStory(newCurrentStory);
    }
  };

  return (
    <Container>
      <StyledButton type="primary" onClick={handlePlay}>
        { !isPlaying ? <CaretRightOutlined /> : <PauseOutlined /> }
      </StyledButton>
      <Select value={currentStory?.id?.toString() || ""} style={{ width: 200 }} onChange={handleStoryChange}>
        <Option value="">Select a story</Option>
        {currentProject?.stories?.map((story) => (
          <Option key={story.id} value={story.id?.toString()}>
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
