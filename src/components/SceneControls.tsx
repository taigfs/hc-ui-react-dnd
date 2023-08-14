import React from "react";
import { Button, Select } from "antd";
import { useAppStore } from "../state/AppStore";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";

const { Option } = Select;

export const SceneControls = () => {
  const { currentProject, currentStory, setCurrentStory } = useAppStore((state) => state);

  const handlePlay = () => {
    // TODO: Implement play functionality
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
        <CaretRightOutlined />
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