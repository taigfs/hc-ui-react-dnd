import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { SiteLinks } from "../enum/SiteLinks";
import { AppstoreOutlined, BookOutlined, ProjectFilled, ProjectOutlined } from "@ant-design/icons";

interface HCMenuProps {
  className?: string;
}

export const HCMenu: React.FC<HCMenuProps> = ({ className }) => {
  const location = useLocation();
  const isProjectSelected = location.pathname !== SiteLinks.Projects;

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={isProjectSelected ? ["project"] : ["projects"]} className={className}>
      <Menu.Item key="projects">
        <Link to={SiteLinks.Projects}>Projects</Link>
      </Menu.Item>
      {
        isProjectSelected && (
        <Menu.Item key="project" icon={<ProjectOutlined />}>
          <Link to={SiteLinks.Projects}>Current Project</Link>
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
