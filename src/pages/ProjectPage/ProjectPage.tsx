import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SceneList } from "./SceneList";
import { StoryList } from "./StoryList";
import { HCLayout } from "../../components/HCLayout";
import axiosInstance from "../../services/api";

export const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

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
