import React from 'react';
import { MosaicWindow, MosaicBranch, MosaicWindowProps } from 'react-mosaic-component';

interface HCWindowProps {
  id: string;
  path: MosaicBranch[];
  totalWindowCount: number;
}

const HCWindow = ({ path, totalWindowCount, id }: HCWindowProps) => {
  return (
    <MosaicWindow<number>
      title={`Window ${id}`}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
      renderToolbar={id === '2' ? () => <div className="toolbar-example">Custom Toolbar</div> : undefined}
    >
      <div className="example-window">
        <h1>{`Window ${id}`}</h1>
      </div>
    </MosaicWindow>
  );
};

export default HCWindow;
