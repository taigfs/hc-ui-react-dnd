import { Layout, Tabs } from "antd";
import React from "react";
import styled from "styled-components";

import { HCFooter } from "./HCFooter";
import { HCHeader } from "./HCHeader";
import { HCMenu } from "./HCMenu";
import { SiteLinks } from "../enum/SiteLinks";
import { HCTabs } from "./HCTabs";

interface HCLayoutProps {
  hasContent?: boolean;
}

export const HCLayout = ({ children, hasContent = true }: React.PropsWithChildren<HCLayoutProps>) => {
  const isProjectSelected = location.pathname !== SiteLinks.Projects;

  return (
    <>
      <Layout>
        <StyledHeader>
          <HCHeader />
        </StyledHeader>
        <Container>
          { isProjectSelected && <StyledHCMenu />}
          <PageContainer>
            <TabsAndControlsContainer>
              <StyledHCTabs />
              <div>
                hihi
              </div>
            </TabsAndControlsContainer>
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

const StyledHCTabs = styled(HCTabs)`
`;