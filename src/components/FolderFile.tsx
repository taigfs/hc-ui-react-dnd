import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileIcon } from './FileIcon';
import { SiteLinks } from '../enum/SiteLinks';
import styled from 'styled-components';

interface FolderFileProps {
  id: string;
  type: string;
  name: string;
}

const FolderFileWrapper = styled.div<{ isSelected: boolean }>`
  padding-left: 20px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f5f5f5' : 'transparent')};
`;

export const FolderFile: React.FC<FolderFileProps> = ({ id, type, name }) => {
  const location = useLocation();

  const isSelected = location.pathname === `${SiteLinks[type as keyof typeof SiteLinks]}/${id}`;

  return (
    <FolderFileWrapper isSelected={isSelected}>
      <Link to={`${SiteLinks[type as keyof typeof SiteLinks]}/${id}`}>
        <FileIcon type={type} />
        {name}
      </Link>
    </FolderFileWrapper>
  );
};
