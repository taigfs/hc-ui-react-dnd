import React from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';

import styled from 'styled-components';
import { HCWindowToolbar } from './HCWindowToolbar';

import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { MOSAIC_COMPONENT } from '../enum/MosaicComponent';

type HCDockProps<T> = {
  initialValue: MosaicNode<string> | null;
};

export function HCDock<T>({ initialValue }: HCDockProps<T>) {
  return (
    <Container className="bp5-dark">
      <Mosaic<string>
        onChange={layout => console.log(layout)}
        renderTile={(id, path) => {
          const { title, node } = MOSAIC_COMPONENT[id];
          return (
            <MosaicWindow<string> title={title} path={path} toolbarControls={<HCWindowToolbar />}>
              {node}
            </MosaicWindow>
          );
        }}
        initialValue={initialValue}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 48px - 40px);
  margin: 0;
`;