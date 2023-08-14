import { Tabs } from "antd";
import { Tab } from "../interfaces/Tab";
import { useAppStore } from "../state/AppStore";
import { CloseOutlined } from "@ant-design/icons";
import { SiteLinks } from "../enum/SiteLinks";
import { useNavigate } from "react-router-dom";

export const HCTabs = () => {
  const navigate = useNavigate();
  const { tabs, activeTab, setActiveTab, closeTab } = useAppStore(state => ({
    tabs: state.tabs,
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    closeTab: state.closeTab
  }));

  return (
    <Tabs
      activeKey={activeTab?.data?.id?.toString()}
      onChange={(key) => {
        const selectedTab = tabs.find(tab => tab?.data?.id?.toString() === key);
        if (selectedTab) {
          setActiveTab(selectedTab);
          selectedTab.type === "scene" ? 
            navigate(SiteLinks.Scene.replace(":id", selectedTab.data.id?.toString() || "")) : 
            navigate(SiteLinks.Story.replace(":id", selectedTab.data.id?.toString() || ""));
        }
      }}
      type="card"
      size={"small"}
      tabBarStyle={{ marginBottom: 0, marginTop: 2, marginLeft: 2 }}
      items={tabs.map((tab) => ({
        key: tab.data.id?.toString() || `0`,
        label: `${tab.data.name} (${tab.type})`,
        closable: true,
        onClose: () => closeTab(tab),
        closeIcon: <CloseOutlined />
      }))}
    />
  );
}
