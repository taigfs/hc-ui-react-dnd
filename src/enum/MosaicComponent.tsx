import { MOSAIC_COMPONENT_NAME } from "./MosaicComponentName";
import { SceneToolbar } from "../components/SceneToolbar";

const BoardComponent = () => <div>Board</div>;
const ConsoleComponent = () => <div>Console</div>;

export const MOSAIC_COMPONENT: Record<string, { title: string, node: React.ReactNode}> = {
  [MOSAIC_COMPONENT_NAME.SCENE_TOOLBAR]: {
    title: 'Toolbar',
    node: <SceneToolbar />,
  },
  [MOSAIC_COMPONENT_NAME.BOARD]: {
    title: 'Board',
    node: <BoardComponent />,
  },
  [MOSAIC_COMPONENT_NAME.CONSOLE]: {
    title: 'Console',
    node: <ConsoleComponent />,
  },
  [MOSAIC_COMPONENT_NAME.XXX]: {
    title: 'xxx',
    node: <div>xxx</div>,
  },
};