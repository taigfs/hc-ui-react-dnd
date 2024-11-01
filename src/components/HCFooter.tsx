import React from "react";
import styled from "styled-components";

export const HCFooter = () => {
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
  padding: 32px 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
