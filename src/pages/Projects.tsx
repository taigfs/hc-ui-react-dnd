import { Button, Col, List, Row, Typography } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

import { HCLayout } from "../components/HCLayout";
import { SiteLinks } from "../enum/SiteLinks";

interface ProjectRow {
  id?: number;
  name?: string;
  owner?: string;
  lastUpdate?: string;
  creating?: boolean;
}

export const Projects = () => {
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ProjectRow[]>([
    { name: "Project 1", owner: "me", lastUpdate: "2021-01-01", id: 1 },
    { name: "Project 2", owner: "me", lastUpdate: "2021-01-01", id: 2 },
    { name: "Project 3", owner: "me", lastUpdate: "2021-01-01", id: 3 },
    { name: "Project 4", owner: "me", lastUpdate: "2021-01-01", id: 4 },
    { name: "Project 5", owner: "me", lastUpdate: "2021-01-01", id: 5 },
  ]);

  const onCreateProject = (projectName: string) => {
    setData([
      ...data.filter((item) => !item.creating),
      { name: projectName, owner: "me", lastUpdate: "2021-01-01" },
    ]);
    setIsCreating(false);
  };

  const onProjectClick = (item: ProjectRow) => {
    if (!item.id) {
      return;
    }
    window.location.href = SiteLinks.Project.replace(":id", item.id.toString());
  };

  const ListHeader = () => (
    <Row>
      <Col span={13}>Name</Col>
      <Col span={6}>Owner</Col>
      <Col span={5}>Last update</Col>
    </Row>
  );

  return (
    <>
      <HCLayout>
        <Container>
          <Row className="mb-3">
            <Col span={20} style={{ display: "flex", alignItems: "center" }}>
              <h1>Projects</h1>
            </Col>
            <Col span={4} className="text-right">
              <Button type="primary" onClick={() => setIsCreating(true)}>
                Create
              </Button>
            </Col>
          </Row>
          <StyledList
            header={<ListHeader />}
            bordered
            dataSource={!isCreating ? data : [...data, { creating: true }]}
            renderItem={(renderedItem) => {
              const item = renderedItem as ProjectRow;
              if (item.creating) {
                return (
                  <StyledListItem>
                    <Typography.Text
                      style={{ fontSize: 18, width: "100%" }}
                      editable={{
                        editing: true,
                        onChange: onCreateProject,
                      }}
                    >
                      New project
                    </Typography.Text>
                  </StyledListItem>
                );
              } else {
                return (
                  <StyledListItem onClick={() => onProjectClick(item)}>
                    <Row className="w-100">
                      <Col span={13}>{item.name}</Col>
                      <Col span={6}>{item.owner}</Col>
                      <Col span={5}>{item.lastUpdate}</Col>
                    </Row>
                  </StyledListItem>
                );
              }
            }}
            size="large"
          />
        </Container>
      </HCLayout>
    </>
  );
};

const StyledListItem = styled(List.Item)`
  cursor: pointer;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${(props) => props.theme.color.featuredSquareBg};
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const StyledList = styled(List)`
  max-height: 520px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.squareBg};
    border-left: 1px solid ${(props) => props.theme.color.squareBorder};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.squareBorder};
    border-radius: 8px;
  }
`;
