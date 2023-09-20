import React from "react";
import styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";
import { useLocalExecution } from "../hooks/use-local-execution";

export const Console: React.FC = () => {
  const { currentExecutionLogs: messages, clearCurrentExecutionLogs: clearMessages } = useLocalExecution();

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    } as any;
    return date.toLocaleString("en-US", options);
  };

  return (
    <Container>
      <ControlsContainer>
        <ClearButton onClick={clearMessages}>
          <StopOutlined />
        </ClearButton>
      </ControlsContainer>
      <ConsoleContainer>
        {messages.map((message, index) => (
          <ConsoleMessage key={index}>
            <ConsoleDate>{formatCreatedAt(message.createdAt)}</ConsoleDate>
            <ConsoleContent>
              {message.nodeType} {JSON.stringify(message.inputData)}
            </ConsoleContent>
          </ConsoleMessage>
        ))}
      </ConsoleContainer>
      <ConsoleInput type="text" placeholder="Enter command..." />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.color.squareBorder};
`;

const ControlsContainer = styled.div`
  padding: 8px;
`;

const ConsoleContainer = styled.div`
  position: relative;
  overflow-y: auto;
  padding: 10px;
  flex: 1;
  background-color: ${(props) => props.theme.color.squareBg};
`;

const ConsoleMessage = styled.div`
  margin-bottom: 10px;
`;

const ConsoleDate = styled.span`
  font-size: 12px;
  color: #00ff08;
  margin-right: 10px;
`;

const ConsoleContent = styled.span``;

const ConsoleInput = styled.input`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.squareBorder};
  background-color: ${(props) => props.theme.color.squareBg};
`;

const ClearButton = styled.button`
  background: none; 
  border: none; 
  cursor: pointer; 
  color: ${(props) => props.theme.color.text}; 
  font-size: 14px; 
  padding: 5px; 
`;
