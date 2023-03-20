import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <StyledFooter className="bg-gray-800 text-white text-center py-4">
      Hook Captain Inc. &copy; {new Date().getFullYear()}
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  color: ${(props) => props.theme.color.squareBorder};
  text-align: center;
  padding: 1rem;
  bottom: 0;
  left: 0;
  right: 0;
`;
