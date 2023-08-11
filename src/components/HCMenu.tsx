import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { SiteLinks } from "../enum/SiteLinks";
import { AppstoreOutlined, BookOutlined, ProjectFilled, ProjectOutlined } from "@ant-design/icons";
import { useAppStore } from "../state/AppStore";

interface HCMenuProps {
  className?: string;
}

export const HCMenu: React.FC<HCMenuProps> = ({ className }) => {
  const location = useLocation();
  const isProjectSelected = location.pathname !== SiteLinks.Projects;
  const currentProject = useAppStore((state) => state.currentProject);

  const selectedKey = (() => {
    if (location.pathname.startsWith(SiteLinks.Scenes)) {
      return "scenes";
    } else if (location.pathname.startsWith(SiteLinks.Stories)) {
      return "stories";
    } else {
      return isProjectSelected ? "project" : "projects";
    }
  })();

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={[selectedKey]} className={className}>
      <Menu.Item key="projects">
        <Link to={SiteLinks.Projects}>Projects</Link>
      </Menu.Item>
      {
        isProjectSelected && currentProject && (
          <Menu.Item key="project" icon={<ProjectOutlined />}>
            <Link to={SiteLinks.Project.replace(':id', String(currentProject.id) || "")}>{currentProject.name}</Link>
          </Menu.Item>
        )
      }
      <Menu.Item key="scenes" icon={<AppstoreOutlined />} title="Scenes">
        <Link to={SiteLinks.Scenes}>Scenes</Link>
      </Menu.Item>
      <Menu.Item key="stories" icon={<BookOutlined />} title="Stories">
        <Link to={SiteLinks.Stories}>Stories</Link>
      </Menu.Item>
    </Menu>
  );
};
