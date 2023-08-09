import styled from "styled-components";

import { ToolbarButton } from "./ToolbarButton";

export const ToolbarContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.squareBorder};
  width: 180px;
  padding: 0 16px 16px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text};
  max-height: 300px;
  overflow-y: auto;
  position: relative;

  /* Foreground, Background */
  scrollbar-color: #444 #111;

  &::-webkit-scrollbar {
    width: 5px; /* Mostly for vertical scrollbars */
  }
  &::-webkit-scrollbar-thumb {
    /* Foreground */
    background: #444;
  }
  &::-webkit-scrollbar-track {
    /* Background */
    background: #111;
  }
`;

export const ButtonsContainer = styled.div`
  padding-top: 16px;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledToolbarButton = styled(ToolbarButton)`
  margin-right: 6px;
  margin-bottom: 6px;
`;
