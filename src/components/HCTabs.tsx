import { Tabs } from "antd";
import { useAppStore } from "../state/AppStore";
import { CloseOutlined } from "@ant-design/icons";
import { SiteLinks } from "../enum/SiteLinks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";
import { Tab } from "../interfaces/Tab";
import styled from "styled-components";

export const HCTabs = () => {
  const navigate = useNavigate();
  const { tabs, activeTab, setActiveTab, closeTab, currentProject, setCurrentScene, setCurrentStory } = useAppStore(state => state);
  const [hasRemovedTab, setHasRemovedTab] = useState<boolean>(false);

  useEffect(() => {
    if (hasRemovedTab && tabs.length === 0) {
      const projectId = currentProject?.id?.toString() || "";
      navigate(SiteLinks.Project.replace(":id", projectId));
    }
  }, [tabs, hasRemovedTab]);

  const getKey = (tab: Tab | null) => {
    if (!tab) { return `0`; }
    return `${tab?.type}${tab?.data?.id?.toString()}`;
  }

  return (
    <StyledTabs
      hideAdd
      activeKey={getKey(activeTab)}
      onChange={(key) => {
        const selectedTab = tabs.find(tab => getKey(tab) === key);
        if (selectedTab) {
          setActiveTab(selectedTab);
          if(selectedTab.type === "scene") {
            setCurrentScene(selectedTab.data as Scene);
            navigate(SiteLinks.Scene.replace(":id", selectedTab.data.id?.toString() || ""))
          } else if (selectedTab.type === "story") {
            setCurrentStory(selectedTab.data as Story);
            navigate(SiteLinks.Story.replace(":id", selectedTab.data.id?.toString() || ""));
          } else if (selectedTab.type === "metadata") {
            navigate(SiteLinks.Metadata.replace(":id", selectedTab.data.id?.toString() || ""));
          }

        }
      }}
      onEdit={(key) => {
        const selectedTab = tabs.find(tab => getKey(tab) === key);
        if (selectedTab) {
          closeTab(selectedTab);
          setHasRemovedTab(true);
        }
      }}
      type="editable-card"
      size={"small"}
      tabBarStyle={{ marginBottom: 0, marginTop: 2, marginLeft: 2 }}
      items={tabs.map((tab) => ({
        key: getKey(tab) || `0`,
        label: <div><span style={{ textTransform: 'capitalize'}}>{tab.type}</span>{tab.data.name ? `: ` + tab.data.name : ""}</div>,
        closable: true,
        closeIcon: <CloseOutlined />,
      }))}
    />
  );
}

const StyledTabs = styled(Tabs)`
  min-height: 39px;
`;