import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';

import { useBoardStore } from "../../state/BoardStore";
import { useAppStore } from "../../state/AppStore";
import { useWindowStore } from "../../state/WindowStore";
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import React from 'react';
import HCWindow from '../../components/Mosaic/HCWindow';

export function StoryPage() {
  const { currentScene } = useAppStore((state) => state);
  const { windows } = useWindowStore((state) => state);

  return (
    <div style={{ width: '100%', height: '100%', margin: 0 }}>
      <Mosaic<string>
        renderTile={(id) => {
          const window = windows.find((w) => w.id === id);
          return (
            <HCWindow
              id={window?.id || '0'}
              totalWindowCount={windows.length}
              path={window?.path || []}
            />
          );
        }}
        initialValue={{
          direction: 'row',
          first: 'toolbars',
          second: {
            direction: 'column',
            first: 'board',
            second: 'console',
          },
          splitPercentage: 40,
        }}
      />
    </div>
  );
}
