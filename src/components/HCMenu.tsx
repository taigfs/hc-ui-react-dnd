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

  const isCurrentProjectSelected = location.pathname === SiteLinks.Projects;

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={isCurrentProjectSelected ? ["1"] : ["projects"]} className={className}>
      <Menu.Item key="projects">
        <Link to={SiteLinks.Projects}>Projects</Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<ProjectOutlined />}>
        <Link to={SiteLinks.Projects}>Current Project</Link>
      </Menu.Item>
      <Menu.SubMenu key="scenes" icon={<AppstoreOutlined />} title="Scenes">
        <Menu.Item key="scenes-all">
          <Link to="/scenes">All Scenes</Link>
        </Menu.Item>
        <Menu.Item key="scenes-favorites">
          <Link to="/scenes/favorites">Favorite Scenes</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="stories" icon={<BookOutlined />} title="Stories">
        <Menu.Item key="stories-all">
          <Link to="/stories">All Stories</Link>
        </Menu.Item>
        <Menu.Item key="stories-favorites">
          <Link to="/stories/favorites">Favorite Stories</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
