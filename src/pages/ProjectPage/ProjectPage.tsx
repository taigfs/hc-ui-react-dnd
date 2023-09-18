import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { HCLayout } from "../../components/HCLayout";
import { useAppStore } from "../../state/AppStore";
import { MosaicNode } from "react-mosaic-component";
import { useWindowStore } from "../../state/WindowStore";
import { MOSAIC_COMPONENT_NAME } from "../../enum/MosaicComponentName";
import { HCDock } from "../../components/HCDock";
import { HCTabs } from "../../components/HCTabs";
import useLocalProjects from "../../hooks/use-local-projects";
import useLocalScenes from "../../hooks/use-local-scenes";
import useLocalStories from "../../hooks/use-local-stories";

export const ProjectPage = () => {
  const { id } = useParams();
  const { get } = useLocalProjects();
  const { getAll: getAllScenes } = useLocalScenes();
  const { getAll: getAllStories } = useLocalStories();
  const setCurrentProject = useAppStore((state) => state.setCurrentProject);
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

  useEffect(() => {
    if (!id) { return; }

    const fetchProject = async () => {
      const project = await get(id);
      console.log(project);
      if (project) { setCurrentProject(project); }
    };

    fetchProject();
    getAllScenes(id);
    getAllStories(projectId);
  }, [id]);

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
