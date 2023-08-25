import React from 'react';
import styled from 'styled-components';
import FolderWindow from '../components/FolderWindow/FolderWindow';
import Sheet from '../components/Sheet';

const SheetPage: React.FC = () => {
  return (
    <Container>
      <FolderWindow />
      <Sheet />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

export default SheetPage;
