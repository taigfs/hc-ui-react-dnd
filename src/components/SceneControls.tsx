import React from "react";
import { Button, Select } from "antd";
import { useAppStore } from "../state/AppStore";

const { Option } = Select;

export const SceneControls = () => {
  const { currentProject } = useAppStore((state) => state);

  const handlePlay = () => {
    // TODO: Implement play functionality
  };

  const handleStoryChange = (value: string) => {
    // TODO: Implement story change functionality
  };

  return (
    <div>
      <Button type="primary" onClick={handlePlay}>
        Play
      </Button>
      <Select defaultValue="" style={{ width: 200 }} onChange={handleStoryChange}>
        <Option value="">Select a story</Option>
        {currentProject?.stories.map((story) => (
          <Option key={story.id} value={story.id}>
            {story.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
