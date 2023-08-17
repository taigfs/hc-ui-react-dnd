import React, { useEffect } from 'react';
import { MosaicNode } from 'react-mosaic-component';

import { HCDock } from '../../components/HCDock';
import { useWindowStore } from '../../state/WindowStore';
import { AgentsToolbar } from '../../components/Toolbar/AgentsToolbar';
import { MapAssetsToolbar } from '../../components/Toolbar/MapAssetsToolbar';
import { MOSAIC_COMPONENT_NAME } from '../../enum/MosaicComponent';

export function StoryPage() {
  const { mosaicNodes, setMosaicNodes } = useWindowStore((state) => state);

  useEffect(() => {
    const initialValue = {
      direction: 'row',
      first: {
        direction: 'row',
        splitPercentage: 20,
        first: MOSAIC_COMPONENT_NAME.SCENE_TOOLBAR,
        second: {
          splitPercentage: 80,
          direction: 'column',
          first: MOSAIC_COMPONENT_NAME.BOARD,
          second: MOSAIC_COMPONENT_NAME.CONSOLE,
        },
      },
      second: MOSAIC_COMPONENT_NAME.XXX,
      splitPercentage: 80,
    } as MosaicNode<string>;
    setMosaicNodes(initialValue);
  }, []);
  
  
  return (
    <HCDock initialValue={mosaicNodes} />
  );
}
