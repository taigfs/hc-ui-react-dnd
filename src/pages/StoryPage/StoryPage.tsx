import { Mosaic, MosaicWindow, MosaicBranch } from 'react-mosaic-component';

import { useBoardStore } from "../../state/BoardStore";
import { useAppStore } from "../../state/AppStore";
import { useWindowStore } from "../../state/WindowStore";
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import React from 'react';

export function StoryPage() {
  const { setIsPlaying, isPlaying } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);
  const { windows } = useWindowStore((state) => state);

  return (
    <div style={{ width: '100%', height: '100%', margin: 0 }}>
      <Mosaic<string>
        renderTile={(id) => {
          const window = windows.find((w) => w.id === id);
          if (window) {
            return (
              <MosaicWindow<number>
                title={`Window ${window.count}`}
                createNode={() => window.totalWindowCount + 1}
                path={window.path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={window.count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : undefined}
              >
                <div className="example-window">
                  <h1>{`Window ${window.count}`}</h1>
                </div>
              </MosaicWindow>
            );
          }
          return null;
        }}
        initialValue={{
          direction: 'row',
          first: windows[0]?.id || null,
          second: windows[1]?.id || null,
          splitPercentage: 40,
        }}
      />
    </div>
  );
}
