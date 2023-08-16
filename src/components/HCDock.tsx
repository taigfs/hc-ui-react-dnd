import React from 'react';
import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';

import { useWindowStore } from "../state/WindowStore";
import HCWindow from "./Mosaic/HCWindow";

const HCDock = () => {
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
};

export default HCDock;
