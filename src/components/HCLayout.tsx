import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

import { HCFooter } from "./HCFooter";
import { HCHeader } from "./HCHeader";
import { SiteLinks } from "../enum/SiteLinks";

interface HCLayoutProps {
  hasContent?: boolean;
}

export const HCLayout = ({ children, hasContent = false }: React.PropsWithChildren<HCLayoutProps>) => {
  const isProjectSelected = location.pathname !== SiteLinks.Projects;

  return (
    <>
      <Layout>
        <StyledHeader>
          <HCHeader />
        </StyledHeader>
        <Container>
          <PageContainer>
            { hasContent ? <StyledContent>{children}</StyledContent> : children}
          </PageContainer>
        </Container>
        <StyledHCFooter />
      </Layout>
    </>
  );
};

const StyledHeader = styled(Layout.Header)`
  background-color: ${(props) => props.theme.color.squareBg};
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
  padding-inline: 16px;
  height: 48px;
`;

const StyledContent = styled(Layout.Content)`
  background-color: ${(props) => props.theme.color.squareBg};
  padding: 50px;
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh - 48px);
  width: 100%;
  overflow: hidden;
`;

const StyledHCFooter = styled(HCFooter)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const TabsAndControlsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.color.squareBorder};
`;