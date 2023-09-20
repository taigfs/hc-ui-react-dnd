import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { StoryList } from '../pages/ProjectPage/StoryList';
import { SceneList } from '../pages/ProjectPage/SceneList';
import { useAppStore } from '../state/AppStore';

const ProjectWorkspace: React.FC = () => {
  const { currentProject } = useAppStore((state) => state);
  return (
    <Container>
      <WelcomeMessage>Welcome to the Project {currentProject?.name}!</WelcomeMessage>
      <Row>
        <Col flex={1}>
          <SceneList />
        </Col>
        <Col flex={1} style={{ marginLeft: '16px' }}>
          <StoryList />
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
