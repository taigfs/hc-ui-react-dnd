import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ProjectOutlined, AppstoreOutlined, BookOutlined } from "@ant-design/icons";

export const HCMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="projects" icon={<ProjectOutlined />}>
        <Link to="/projects">Projects</Link>
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
