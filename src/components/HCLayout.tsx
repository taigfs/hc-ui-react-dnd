import React from "react";
import { Layout } from "antd";
import { HCSider } from "./HCSider";
import { HCTabs } from "./HCTabs";
import { SceneControls } from "./SceneControls"; // Added import for SceneControls

const { Content } = Layout;

export const HCLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HCSider />
      <Layout>
        <Content style={{ margin: "16px" }}>
          {/* Replace the placeholder with SceneControls component */}
          <SceneControls />
        </Content>
        <HCTabs />
      </Layout>
    </Layout>
  );
};
