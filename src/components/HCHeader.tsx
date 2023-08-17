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
import { Link, useNavigate } from "react-router-dom";

export const HCHeader = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { setUser } = useAuthStore((state) => state);
  
  const logout = () => {
    googleLogout();
    setUser(null);
    navigate(SiteLinks.Login);
  }
  
  const items: MenuProps['items'] = [
    {
      label: <a onClick={logout}>Logout</a>,
      key: '0',
    }
  ];

  return (
    <StyledHeader className="bg-gray-800 text-white text-center py-4">
      <Link to={SiteLinks.Home}>
        <LogoImg src={`https://hookcaptain.s3.sa-east-1.amazonaws.com/hc-logo.png`} alt="Logo" />
      </Link>
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
  height: 48px;

  a {
    display: flex;
    align-items: center;
  }
`;

const LogoImg = styled.img`
  border-radius: 50%;
  width: 24px;
  height: 24px;
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
  width: 24px;
  height: 24px;
`;
