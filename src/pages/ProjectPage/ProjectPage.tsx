import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SceneList } from "./SceneList";
import { StoryList } from "./StoryList";
import { HCLayout } from "../../components/HCLayout";
import { useAppStore } from "../../state/AppStore";
import { MosaicNode } from "react-mosaic-component";
import { useWindowStore } from "../../state/WindowStore";
import { MOSAIC_COMPONENT_NAME } from "../../enum/MosaicComponentName";
import { HCDock } from "../../components/HCDock";
import { HCTabs } from "../../components/HCTabs";
import { useProject } from "../../hooks/use-project";
import { useAgentClass } from "../../hooks/use-agent-class";

export const ProjectPage = () => {
  const { id } = useParams();
  const { data: project } = useProject(Number(id) || 0);
  const setCurrentProject = useAppStore((state) => state.setCurrentProject);
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);
  const { agentClasses } = useAgentClass(Number(id));

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

  useEffect(() => {
    agentClasses.refetch();
  }, []);

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
        <TabsAndControlsContainer>
          <HCTabs />
        </TabsAndControlsContainer>
        <HCDock initialValue={mosaicNodes} />
      </HCLayout>
    </>
  );
};

const TabsAndControlsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
`;
