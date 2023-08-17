import React from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';

import styled from 'styled-components';
import { Layout } from 'antd';
import { HCHeader } from './HCHeader';
import { HCFooter } from './HCFooter';
import { HCWindowToolbar } from './HCWindowToolbar';

import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';

type HCDockProps<T> = {
  initialValue: MosaicNode<string> | null;
  components: Record<string, { title: string, node: React.ReactNode}>;
};

export function HCDock<T>({ initialValue, components }: HCDockProps<T>) {

  return (
    <Layout>
      <StyledHeader>
        <HCHeader />
      </StyledHeader>
      <Container className="bp5-dark">
        <Mosaic<string>
          onChange={layout => console.log(layout)}
          renderTile={(id, path) => {
            const { title, node } = components[id];
            return (
              <MosaicWindow<string> title={title} path={path} toolbarControls={<HCWindowToolbar />}>
                {node}
              </MosaicWindow>
            );
          }}
          initialValue={initialValue}
        />
      </Container>
      <StyledHCFooter />
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  margin: 0;
`;

const StyledHeader = styled(Layout.Header)`
  background-color: ${(props) => props.theme.color.squareBg};
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
  padding-inline: 16px;
`;

const StyledHCFooter = styled(HCFooter)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
