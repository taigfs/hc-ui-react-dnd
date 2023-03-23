import { Col, Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SceneList } from "./SceneList";
import { StoryList } from "./StoryList";
import { HCLayout } from "../../components/HCLayout";

export const ProjectPage = () => {
  const { id } = useParams();

  return (
    <>
      <HCLayout>
        <Container>
          <Row>
            <Col span={12}>
              <SceneList />
            </Col>
            <Col span={12}>
              <StyledStoryList />
            </Col>
          </Row>
        </Container>
      </HCLayout>
    </>
  );
};

const Container = styled.div`
  max-width: 660px;
  margin: auto;
`;

const StyledStoryList = styled(StoryList)`
  padding-left: 16px;
`;
