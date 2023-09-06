import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  loading?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  const isLoading = loading;
  return (
    <>
      {isLoading && (
        <FixedFooter>
          <StyledSpin size="large" />
        </FixedFooter>
      )}
    </>
  );
};

const FixedFooter = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
`;

const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #fff; // light spinner color
  }
`;