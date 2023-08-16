import React from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';

import { useWindowStore } from "../state/WindowStore";
import HCWindow from "./Mosaic/HCWindow";
import styled from 'styled-components';
import { Layout } from 'antd';
import { HCHeader } from './HCHeader';
import { HCFooter } from './HCFooter';

type HCDockProps = {
  initialValue: MosaicNode<string> | null;
};

export const HCDock = ({ initialValue }: HCDockProps) => {
  const { windows } = useWindowStore((state) => state);

  return (
    <Layout>
        <StyledHeader>
          <HCHeader />
        </StyledHeader>
        <Container>
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
            initialValue={initialValue}
          />
        </Container>
        <StyledHCFooter />
      </Layout>
  );
};

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
