import React from "react";
import { useExecutionStore } from "../state/ExecutionStore";
import styled from "styled-components";

export const Console: React.FC = () => {
  const { messages } = useExecutionStore((state) => state);

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div>
      <ConsoleContainer>
        {messages.map((message, index) => (
          <ConsoleMessage key={index}>
            [{formatCreatedAt(message.createdAt)}] {message.nodeType}
          </ConsoleMessage>
        ))}
      </ConsoleContainer>
      <ConsoleInput type="text" placeholder="Enter command..." />
    </div>
  );
};

const ConsoleContainer = styled.div`
  height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ConsoleMessage = styled.div`
  margin-bottom: 10px;
`;

const ConsoleInput = styled.input`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
`;
