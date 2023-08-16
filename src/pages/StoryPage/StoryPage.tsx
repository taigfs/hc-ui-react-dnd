import { MosaicNode } from 'react-mosaic-component';

import { useBoardStore } from "../../state/BoardStore";
import { useAppStore } from "../../state/AppStore";
import { useWindowStore } from "../../state/WindowStore";
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import React from 'react';
import HCWindow from '../../components/Mosaic/HCWindow';
import { HCDock } from '../../components/HCDock';

export function StoryPage() {
  const { currentScene } = useAppStore((state) => state);
  const { windows } = useWindowStore((state) => state);

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

  return (
    <HCDock initialValue={initialValue} />
  );
}
