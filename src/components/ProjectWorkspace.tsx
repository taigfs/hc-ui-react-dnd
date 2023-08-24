import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { StoryList } from '../pages/ProjectPage/StoryList';
import { SceneList } from '../pages/ProjectPage/SceneList';

const ProjectWorkspace: React.FC = () => {
  return (
    <Container>
      <WelcomeMessage>Welcome to the Project Workspace!</WelcomeMessage>
      <Row>
        <Col flex={1}>
          <StoryList />
        </Col>
        <Col flex={1} style={{ marginLeft: '16px' }}>
          <SceneList />
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectWorkspace;

const Container = styled.div`
  padding: 20px;
`;

const WelcomeMessage = styled.h1`
  margin-bottom: 20px;
`;
