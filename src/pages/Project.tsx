import { useParams } from "react-router-dom";
import styled from "styled-components";

import { HCLayout } from "../components/HCLayout";

export const Project = () => {
  const { id } = useParams();
  return (
    <>
      <HCLayout>
        <Container>Hello world; {id}</Container>
      </HCLayout>
    </>
  );
};

const Container = styled.div``;
