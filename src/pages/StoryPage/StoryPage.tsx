import React, { useEffect } from 'react';
import { MosaicNode } from 'react-mosaic-component';

import { HCDock } from '../../components/HCDock';
import { useWindowStore } from '../../state/WindowStore';
import { AgentsToolbar } from '../../components/Toolbar/AgentsToolbar';
import { MapAssetsToolbar } from '../../components/Toolbar/MapAssetsToolbar';

export function StoryPage() {
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

  useEffect(() => {
    const initialValue = {
      direction: 'row',
      first: {
        direction: 'row',
        splitPercentage: 20,
        first: 'toolbars',
        second: {
          splitPercentage: 80,
          direction: 'column',
          first: 'board',
          second: 'console', 
        },
      },
      second: 'xxx',
      splitPercentage: 80,
    } as MosaicNode<string>;
    setMosaicNodes(initialValue);
  }, []);

  const ToolbarsComponent = () => (
    <>
      <AgentsToolbar />
      <MapAssetsToolbar />
    </>
  );
  const BoardComponent = () => <div>Board</div>;
  const ConsoleComponent = () => <div>Console</div>;
  
  
  const components = {
    toolbars: {
      title: 'Toolbars',
      node: <ToolbarsComponent />,
    },
    board: {
      title: 'Board',
      node: <BoardComponent />,
    },
    console: {
      title: 'Console',
      node: <ConsoleComponent />,
    },
    xxx: {
      title: 'xxx',
      node: <div>xxx</div>,
    },
  };

  return (
    <HCDock initialValue={mosaicNodes} components={components as any} />
  );
}
