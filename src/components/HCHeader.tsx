import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo-64.png";
import { SiteLinks } from "../enum/SiteLinks";
import { useAuthStore } from "../state/AuthStore";

export const HCHeader = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <StyledHeader className="bg-gray-800 text-white text-center py-4">
      <a href={SiteLinks.Home}>
        <LogoImg src={logoImg} alt="Logo" />
      </a>
      <UserData>
        {!!user?.profilePicture && (
          <UserImg
            src={user?.profilePicture}
            alt="Profile picture"
            referrerPolicy="no-referrer"
          />
        )}
        <span>{user?.name}</span>
      </UserData>
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
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
