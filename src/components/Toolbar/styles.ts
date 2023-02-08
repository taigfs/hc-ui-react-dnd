import styled from "styled-components";
import { ToolbarButton } from "./ToolbarButton";

export const ToolbarContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.squareBorder};
  width: 300px;
  border-radius: 5px;
  padding: 16px 16px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text};
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