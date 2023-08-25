import { MOSAIC_COMPONENT_NAME } from "./MosaicComponentName";
import { SceneToolbar } from "../components/SceneToolbar";
import { SceneBoard } from "../components/SceneBoard";
import { Diagram } from "../components/Diagram/Diagram";
import { DiagramToolbar } from "../components/Diagram/DiagramToolbar";
import { EditNodeWindow } from "../components/EditNodeWindow";
import FolderWindow from "../components/FolderWindow/FolderWindow";
import { SceneList } from "../pages/ProjectPage/SceneList";
import { StoryList } from "../pages/ProjectPage/StoryList";
import ProjectWorkspace from "../components/ProjectWorkspace";
import Sheet from "../components/Sheet";

const ConsoleComponent = () => <div>Console</div>;

export const MOSAIC_COMPONENT: Record<string, { title: string, node: React.ReactNode}> = {
  [MOSAIC_COMPONENT_NAME.SCENE_TOOLBAR]: {
    title: 'Toolbar',
    node: <SceneToolbar />,
  },
  [MOSAIC_COMPONENT_NAME.BOARD]: {
    title: 'Scene',
    node: <SceneBoard />,
  },
  [MOSAIC_COMPONENT_NAME.CONSOLE]: {
    title: 'Console',
    node: <ConsoleComponent />,
  },
  [MOSAIC_COMPONENT_NAME.STORY_DIAGRAM]: {
    title: 'Story',
    node: <Diagram />,
  },
  [MOSAIC_COMPONENT_NAME.STORY_TOOLBAR]: {
    title: 'Toolbar',
    node: <DiagramToolbar />,
  },
  [MOSAIC_COMPONENT_NAME.STORY_EDIT_NODE]: {
    title: 'Attributes',
    node: <EditNodeWindow />,
  },
  [MOSAIC_COMPONENT_NAME.FOLDER_EXPLORER]: {
    title: 'Explorer',
    node: <FolderWindow />,
  },
  [MOSAIC_COMPONENT_NAME.PROJECT_WORKSPACE]: {
    title: 'Workspace',
    node: <ProjectWorkspace />,
  },
  [MOSAIC_COMPONENT_NAME.PROJECT_METADATA]: {
    title: 'Metadata',
    node: <Sheet type="metadata" />,
  },
};