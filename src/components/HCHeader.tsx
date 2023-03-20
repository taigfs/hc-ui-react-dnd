import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo-64.png";
import { SiteLinks } from "../enum/SiteLinks";

export const HCHeader = () => {
  return (
    <StyledHeader className="bg-gray-800 text-white text-center py-4">
      <a href={SiteLinks.Home}>
        <LogoImg src={logoImg} alt="Logo" />
      </a>
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
