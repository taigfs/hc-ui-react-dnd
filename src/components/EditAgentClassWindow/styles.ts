import { Button, Select } from "antd";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.color.squareBorder};
`;

export const SmallInput = styled.input`
  width: 100%;
  padding: 8px;
  background: ${({ theme }) => theme.color.featuredSquareBg};
  color: ${({ theme }) => theme.color.text};
  border-radius: 4px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
  padding-top: 6px;
  padding-bottom: 6px;
`;

export const AddAttrButton = styled(Button)`
  margin-bottom: 16px;
  min-width: 100%;
`;