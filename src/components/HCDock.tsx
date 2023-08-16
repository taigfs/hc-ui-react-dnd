import React from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';

import styled from 'styled-components';
import { Layout } from 'antd';
import { HCHeader } from './HCHeader';
import { HCFooter } from './HCFooter';

type HCDockProps<T> = {
  initialValue: MosaicNode<string> | null;
  components: Record<string, React.ReactNode>;
};

export function HCDock<T>({ initialValue, components }: HCDockProps<T>) {
  return (
    <Layout>
      <StyledHeader>
        <HCHeader />
      </StyledHeader>
      <Container>
        <Mosaic<string>
          renderTile={(id) => {
            const component = components[id];
            return (
              <MosaicWindow<string> title={`Window ${id}`} path={['first']}>
                {component}
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
