import { Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { StyledList, StyledListItem } from "./styles";
import { SiteLinks } from "../../enum/SiteLinks";
import { Project } from "../../interfaces/Project";
import { useAppStore } from "../../state/AppStore";
import { formatDateString } from "../../utils/format-date";
import { useGetScenes, usePostScene } from "../../hooks/use-scene";
import { Scene } from "../../interfaces/Scene";

export const SceneList = () => {
  const { currentProject } = useAppStore((state) => state);
  const projectId = currentProject?.id || 0;
  const { data: scenes, isLoading } = useGetScenes(projectId);
  const { mutate: postScene } = usePostScene();

  const ListHeader = () => (
    <Row>
      <Col span={16}>Name</Col>
      <Col span={8} className="text-right">
        Last update
      </Col>
    </Row>
  );

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const onCreate = async (sceneName: string) => {
    await postScene({ name: sceneName, projectId });
    setIsCreating(false);
  };

  const onClick = (item: Project) => {
    if (!item.id) {
      return;
    }
    window.location.href = SiteLinks.Scene.replace(":id", item.id.toString());
  };

  return (
    <>
      <Row className="mb-3">
        <Col span={16} style={{ display: "flex", alignItems: "center" }}>
          <h1>Scenes</h1>
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
        dataSource={!isCreating ? scenes : [...(scenes || []), { creating: true }]}
        renderItem={(renderedItem) => {
          const item = renderedItem as Scene;
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
                  <Col span={16}>{item.name}</Col>
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
    </>
  );
};

const StyledDateSpan = styled.span`
  font-size: 14px;
`;
