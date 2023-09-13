import { Button, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { StyledList, StyledListItem } from "./styles";
import { SiteLinks } from "../../enum/SiteLinks";
import { Story } from "../../interfaces/Story";
import { useAppStore } from "../../state/AppStore";
import { formatDateString } from "../../utils/format-date";
import { useNavigate } from "react-router-dom";
import useLocalStories from "../../hooks/use-local-stories";

interface StoryListProps {
  className?: string;
}

export const StoryList: React.FC<StoryListProps> = ({ className }) => {
  const { currentProject, setCurrentStory, addTab } = useAppStore((state) => state);
  const { stories, create, getAll } = useLocalStories();
  const navigate = useNavigate();

  useEffect(() => {
    const projectId = currentProject?.id;
    if (!projectId) { return; }
    getAll(projectId);
  }, [currentProject?.id]);

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
    if (!currentProject?.id) { return; }
    create({ name: projectName, projectId: currentProject?.id });
    getAll(currentProject?.id);
    setIsCreating(false);
  };

  const onClick = (item: Story) => {
    if (!item.id) {
      return;
    }
    setCurrentStory(item);
    addTab({ type: 'story', data: item });
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
                  New story
                </Typography.Text>
              </StyledListItem>
            );
          } else {
            return (
              <StyledListItem onClick={() => onClick(item)}>
                <Row className="w-100">
                  <Col span={16}>
                    <>{item.name}</>
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
