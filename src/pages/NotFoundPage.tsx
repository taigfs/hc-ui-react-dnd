import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo-64.png";
import { HCFooter } from "../components/HCFooter";
import { SiteLinks } from "../enum/SiteLinks";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <Container>
        <LogoImg src={logoImg} alt="Logo" />
        <StyledH1>Page not found</StyledH1>
        <div>
          Go back to the <Link to={SiteLinks.Home}>Home Page</Link>
        </div>
      </Container>
      <HCFooter />
    </>
  );
};

const Container = styled.div`
  text-align: center;
  max-width: 400px;
  border: ${({ theme }) => theme.color.squareBorder};
  border-radius: 8px;
  top: 40%;
  transform: translate(-50%, -40%);
  position: absolute;
  left: 50%;
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 16px;
  margin-top: 32px;
`;

const LogoImg = styled.img`
  border-radius: 50%;
`;
