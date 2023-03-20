import { Button, Col, List, Row, Typography } from "antd";
import React, { useEffect } from "react";

import { HCLayout } from "../components/HCLayout";

interface ProjectRowType {
  name?: string;
  owner?: string;
  lastUpdate?: string;
  creating?: boolean;
}

export const Projects = () => {
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ProjectRowType[]>([
    { name: "Project 1", owner: "me", lastUpdate: "2021-01-01" },
    { name: "Project 2", owner: "me", lastUpdate: "2021-01-01" },
    { name: "Project 3", owner: "me", lastUpdate: "2021-01-01" },
    { name: "Project 4", owner: "me", lastUpdate: "2021-01-01" },
    { name: "Project 5", owner: "me", lastUpdate: "2021-01-01" },
  ]);

  const onCreateProject = (projectName: string) => {
    setData([
      ...data.filter((item) => !item.creating),
      { name: projectName, owner: "me", lastUpdate: "2021-01-01" },
    ]);
    setIsCreating(false);
  };

  const Header = () => (
    <Row>
      <Col span={16}>Name</Col>
      <Col span={4}>Owner</Col>
      <Col span={4}>Last update</Col>
    </Row>
  );

  return (
    <>
      <HCLayout>
        <Row className="mb-2">
          <Col span={20}>
            <h1>Projects</h1>
          </Col>
          <Col span={4} className="text-right">
            <Button type="primary" onClick={() => setIsCreating(true)}>
              Create
            </Button>
          </Col>
        </Row>
        <List
          header={<Header />}
          bordered
          dataSource={!isCreating ? data : [...data, { creating: true }]}
          renderItem={(item: ProjectRowType) => {
            if (item.creating) {
              return (
                <List.Item>
                  <Typography.Text
                    style={{ fontSize: 18, width: "100%" }}
                    editable={{
                      editing: true,
                      onChange: onCreateProject,
                    }}
                  >
                    New project
                  </Typography.Text>
                </List.Item>
              );
            } else {
              return (
                <List.Item>
                  <Row className="w-100">
                    <Col span={16}>{item.name}</Col>
                    <Col span={4}>{item.owner}</Col>
                    <Col span={4}>{item.lastUpdate}</Col>
                  </Row>
                </List.Item>
              );
            }
          }}
          size="large"
        />
      </HCLayout>
    </>
  );
};
