import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { SiteLinks } from "../enum/SiteLinks";
import { useAppStore } from "../state/AppStore";

export const HCMenu = () => {
  const { projects, selectedProject } = useAppStore((state) => state);

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to={SiteLinks.Projects}>Projects</Link>
      </Menu.Item>
      {selectedProject && (
        <Menu.SubMenu key="sub1" title={selectedProject.name}>
          <Menu.Item key="2">
            <Link to={SiteLinks.Project.replace(":id", selectedProject.id.toString())}>
              {selectedProject.name}
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}
      <Menu.Item key="3">
        <Link to={SiteLinks.Scenes}>Scenes</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={SiteLinks.Stories}>Stories</Link>
      </Menu.Item>
    </Menu>
  );
};
