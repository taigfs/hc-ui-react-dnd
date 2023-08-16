import { Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { StyledList, StyledListItem } from "./styles";
import { SiteLinks } from "../../enum/SiteLinks";
import { Story } from "../../interfaces/Story";
import { useAppStore } from "../../state/AppStore";
import { formatDateString } from "../../utils/format-date";
import { useGetStories, usePostStory } from "../../hooks/use-story";
import { useNavigate } from "react-router-dom";

interface StoryListProps {
  className?: string;
}

export const StoryList: React.FC<StoryListProps> = ({ className }) => {
  const { currentProject } = useAppStore((state) => state);
  const projectId = currentProject?.id || 0;
  const { data: stories, isLoading } = useGetStories(projectId);
  const { mutate: postStory } = usePostStory();
  const navigate = useNavigate();

  const ListHeader = () => (
    <Row>
      <Col span={16}>Name</Col>
      <Col span={8} className="text-right">
        Last update
      </Col>
    </Row>
  );

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const onCreate = (projectName: string) => {
    postStory({
      name: projectName,
      projectId: currentProject?.id,
    });
    setIsCreating(false);
  };

  const onClick = (item: Story) => {
    if (!item.id) {
      return;
    }
    navigate(SiteLinks.Story.replace(":id", item.id.toString()));
  };

  return (
    <div className={className}>
      <Row className="mb-3">
        <Col span={16} style={{ display: "flex", alignItems: "center" }}>
          <h1>Stories</h1>
        </Col>
        <Col span={8} className="text-right">
          <Button type="primary" onClick={() => setIsCreating(true)}>
            Create
          </Button>
        </Col>
      </Row>
      <StyledList
        header={<ListHeader />}
        bordered
        dataSource={!isCreating ? stories : [...(stories || []), { creating: true }]}
        renderItem={(renderedItem) => {
          const item = renderedItem as Story;
          if (item.creating) {
            return (
              <StyledListItem>
                <Typography.Text
                  style={{ fontSize: 18, width: "100%" }}
                  editable={{
                    editing: true,
                    onChange: onCreate,
                  }}
                >
                  New scene
                </Typography.Text>
              </StyledListItem>
            );
          } else {
            return (
              <StyledListItem onClick={() => onClick(item)}>
                <Row className="w-100">
                  <Col span={16}>
                    <>{item.name}</>
                    { item.scene && <SceneNameSpan>{item.scene.name}</SceneNameSpan> }
                  </Col>
                  <Col span={8} className="text-right">
                    <StyledDateSpan>
                      {formatDateString(item.createdAt)}
                    </StyledDateSpan>
                  </Col>
                </Row>
              </StyledListItem>
            );
          }
        }}
        size="large"
      />
    </div>
  );
};

const StyledDateSpan = styled.span`
  font-size: 14px;
`;

const SceneNameSpan = styled.span`
  font-size: 14px;
  display: block;
  color: ${(props) => props.theme.color.secondaryText};
`;
