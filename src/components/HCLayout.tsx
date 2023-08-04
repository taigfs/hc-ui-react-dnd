import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

import { HCFooter } from "./HCFooter";
import { HCHeader } from "./HCHeader";
import { HCMenu } from "./HCMenu";

export const HCLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>
        <StyledHeader>
          <HCHeader />
        </StyledHeader>
        <Container>
          <StyledHCMenu />
          <StyledContent>
            {children}
          </StyledContent>
        </Container>
        <StyledHCFooter />
      </Layout>
    </>
  );
};

const StyledHeader = styled(Layout.Header)`
  background-color: ${(props) => props.theme.color.squareBg};
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
`;

const StyledContent = styled(Layout.Content)`
  background-color: ${(props) => props.theme.color.squareBg};
  padding: 50px;
`;

const StyledHCMenu = styled(HCMenu)`
  padding: 5px;
  top: 64px;
  width: 200px;
  background-color: ${(props) => props.theme.color.squareBg};
  border-right: 1px solid ${(props) => props.theme.color.squareBorder}!important;
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
`;

const StyledHCFooter = styled(HCFooter)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;