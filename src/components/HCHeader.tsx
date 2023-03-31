import { Dropdown, MenuProps } from "antd";
import React from "react";
import styled from "styled-components";
import {
  DownOutlined
} from '@ant-design/icons';

import logoImg from "../assets/logo-64.png";
import { SiteLinks } from "../enum/SiteLinks";
import { useAuthStore } from "../state/AuthStore";
import { googleLogout } from "@react-oauth/google";

export const HCHeader = () => {
  const user = useAuthStore((state) => state.user);

  const { setUser } = useAuthStore((state) => state);
  
  const logout = () => {
    googleLogout();
    setUser(null);
    window.location.href = SiteLinks.Login;
  }
  
  const items: MenuProps['items'] = [
    {
      label: <a onClick={logout}>Logout</a>,
      key: '0',
    }
  ];

  return (
    <StyledHeader className="bg-gray-800 text-white text-center py-4">
      <a href={SiteLinks.Home}>
        <LogoImg src={logoImg} alt="Logo" />
      </a>
      <Dropdown menu={{ items }} trigger={['click']}>
        <UserData>
          {!!user?.picture && (
            <UserImg
              src={user?.picture}
              alt="Profile picture"
              referrerPolicy="no-referrer"
            />
          )}
          <span>{user?.name}</span>
          <DownOutlined />
        </UserData>
    </Dropdown>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 64px;

  a {
    display: flex;
    align-items: center;
  }
`;

const LogoImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const UserData = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
