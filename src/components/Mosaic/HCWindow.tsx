import React from 'react';
import { MosaicWindow, MosaicBranch, MosaicWindowProps } from 'react-mosaic-component';

interface ExampleWindowProps {
  count: number;
  path: MosaicBranch[];
  totalWindowCount: number;
}

const ExampleWindow = ({ path, totalWindowCount, count }: ExampleWindowProps) => {
  return (
    <MosaicWindow<number>
      title={`Window ${count}`}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
      renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : undefined}
    >
      <div className="example-window">
        <h1>{`Window ${count}`}</h1>
      </div>
    </MosaicWindow>
  );
};

export default ExampleWindow;
