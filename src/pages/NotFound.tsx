import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo-64.png";
import { Footer } from "../components/Footer";
import { SiteLinks } from "../enum/SiteLinks";

export const NotFound = () => {
  return (
    <>
      <Container>
        <LogoImg src={logoImg} alt="Logo" />
        <StyledH1>Page not found</StyledH1>
        <div>
          Go back to the <a href={SiteLinks.Home}>Home Page</a>
        </div>
      </Container>
      <Footer />
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
