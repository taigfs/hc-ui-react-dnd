import { Tabs } from "antd";
import { useAppStore } from "../state/AppStore";
import { CloseOutlined } from "@ant-design/icons";
import { SiteLinks } from "../enum/SiteLinks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Scene } from "../interfaces/Scene";

export const HCTabs = () => {
  const navigate = useNavigate();
  const { tabs, activeTab, setActiveTab, closeTab, currentProject, setCurrentScene } = useAppStore(state => state);
  const [hasRemovedTab, setHasRemovedTab] = useState<boolean>(false);

  useEffect(() => {
    if (hasRemovedTab && tabs.length === 0) {
      const projectId = currentProject?.id?.toString() || "";
      navigate(SiteLinks.Project.replace(":id", projectId));
    }
  }, [tabs, hasRemovedTab]);

  return (
    <Tabs
      hideAdd
      activeKey={activeTab?.data?.id?.toString()}
      onChange={(key) => {
        const selectedTab = tabs.find(tab => tab?.data?.id?.toString() === key);
        if (selectedTab) {
          setActiveTab(selectedTab);
          if(selectedTab.type === "scene") {
            setCurrentScene(selectedTab.data as Scene);
            navigate(SiteLinks.Scene.replace(":id", selectedTab.data.id?.toString() || ""))
          } else {
            navigate(SiteLinks.Story.replace(":id", selectedTab.data.id?.toString() || ""));
          }
        }
      }}
      onEdit={(key) => {
        const selectedTab = tabs.find(tab => tab?.data?.id?.toString() === key);
        if (selectedTab) {
          closeTab(selectedTab);
          setHasRemovedTab(true);
        }
      }}
      type="editable-card"
      size={"small"}
      tabBarStyle={{ marginBottom: 0, marginTop: 2, marginLeft: 2 }}
      items={tabs.map((tab) => ({
        key: tab.data.id?.toString() || `0`,
        label: (
          <>
            <div style={{ fontSize: '75%', lineHeight: '75%', textTransform: 'capitalize' }}>{tab.type}</div>
            <div>{tab.data.name}</div>
          </>
        ),
        closable: true,
        closeIcon: <CloseOutlined />,
      }))}
    />
  );
}
