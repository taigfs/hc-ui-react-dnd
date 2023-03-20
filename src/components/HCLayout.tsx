import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

import { HCFooter } from "./HCFooter";
import { HCHeader } from "./HCHeader";

export const HCLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>
        <StyledHeader>
          <HCHeader />
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <Layout.Footer>
          <HCFooter />
        </Layout.Footer>
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
