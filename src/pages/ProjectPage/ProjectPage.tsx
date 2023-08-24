import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SceneList } from "./SceneList";
import { StoryList } from "./StoryList";
import { HCLayout } from "../../components/HCLayout";
import axiosInstance from "../../services/api";
import { useAppStore } from "../../state/AppStore"; // Added import
import { MosaicNode } from "react-mosaic-component";
import { useWindowStore } from "../../state/WindowStore";
import { MOSAIC_COMPONENT_NAME } from "../../enum/MosaicComponentName";
import { HCDock } from "../../components/HCDock";

export const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const setCurrentProject = useAppStore((state) => state.setCurrentProject); // Added setCurrentProject
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

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

  useEffect(() => {
    setMosaicNodes({
      direction: 'row',
      first: MOSAIC_COMPONENT_NAME.FOLDER_EXPLORER,
      second: MOSAIC_COMPONENT_NAME.PROJECT_WORKSPACE,
      splitPercentage: 20,
    } as MosaicNode<string>);
  }, []);

  return (
    <>
      <HCLayout>
        <HCDock initialValue={mosaicNodes} />
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
