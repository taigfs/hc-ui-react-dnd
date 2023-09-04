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

export const ErrorMessage = styled.div`
  background-color: #ff3d3d;
  color: ${({ theme }) => theme.color.text};
  border-radius: 4px;
  font-weight: 500;
  font-size: 80%;
  padding: 1px 4px;
  display: inline-block;
  margin: 4px 0 8px;
`;