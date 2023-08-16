import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';

import { useBoardStore } from "../../state/BoardStore";
import { useAppStore } from "../../state/AppStore";
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import React from 'react';
import HCWindow from '../../components/Mosaic/HCWindow';

export function StoryPage() {
  const { setIsPlaying, isPlaying } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);

  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: (
      <HCWindow
        count={1}
        totalWindowCount={1}
        path={['first']}
      />
    ),
    b: (
      <HCWindow
        count={2}
        totalWindowCount={2}
        path={['second', 'first']}
      />
    ),
    c: (
      <HCWindow
        count={3}
        totalWindowCount={3}
        path={['second', 'second']}
      />
    ),
  };

  return (
    <div style={{ width: '100%', height: '100%', margin: 0 }}>
      <Mosaic<string>
        renderTile={(id) => ELEMENT_MAP[id]}
        initialValue={{
          direction: 'row',
          first: 'a',
          second: {
            direction: 'column',
            first: 'b',
            second: 'c',
          },
          splitPercentage: 40,
        }}
      />
    </div>
  );
}