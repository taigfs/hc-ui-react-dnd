import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { SiteLinks } from "../enum/SiteLinks";

export const HCMenu = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to={SiteLinks.Projects}>Projects</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={SiteLinks.Scenes}>Scenes</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={SiteLinks.Stories}>Stories</Link>
      </Menu.Item>
    </Menu>
  );
};
