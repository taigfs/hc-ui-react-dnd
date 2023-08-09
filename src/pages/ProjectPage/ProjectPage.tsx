import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SceneList } from "./SceneList";
import { StoryList } from "./StoryList";
import { HCLayout } from "../../components/HCLayout";
import axiosInstance from "../../services/api";
import { useAppStore } from "../../state/AppStore"; // Added import

export const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const setCurrentProject = useAppStore((state) => state.setCurrentProject); // Added setCurrentProject

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/project/${id}`);
        const projectData = response.data;
        setProject(projectData);
        setCurrentProject(projectData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id, setCurrentProject]);

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
