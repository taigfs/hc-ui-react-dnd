import React, { useEffect } from 'react';
import { MosaicNode } from 'react-mosaic-component';

import { useAppStore } from "../../state/AppStore";
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { HCDock } from '../../components/HCDock';
import { useWindowStore } from '../../state/WindowStore';

export function StoryPage() {
  const { currentScene } = useAppStore((state) => state);
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

  useEffect(() => {
    const initialValue = {
      direction: 'row',
      first: 'toolbars',
      second: {
        direction: 'column',
        first: 'board',
        second: 'console',
      },
      splitPercentage: 40,
    } as MosaicNode<string>;
    setMosaicNodes(initialValue);
  }, []);

  const ToolbarsComponent = () => <div>Toolbars</div>;
  const BoardComponent = () => <div>Board</div>;
  const ConsoleComponent = () => <div>Console</div>;
  
  const components = {
    toolbars: <ToolbarsComponent />,
    board: <BoardComponent />,
    console: <ConsoleComponent />,
  };

  return (
    <HCDock initialValue={mosaicNodes} components={components} />
  );
}
