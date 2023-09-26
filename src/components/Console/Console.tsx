import React, { useState } from "react";
import styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";
import { useLocalExecution } from "../../hooks/use-local-execution";
import { CustomAutoComplete } from "./CustomAutoComplete";
import { useGenerateScene } from "../../hooks/use-project";
import { useAppStore } from "../../state/AppStore";
import useLocalScenes from "../../hooks/use-local-scenes";
import useLocalMapAssets from "../../hooks/use-local-map-assets";
import LoadingText from "./LoadingText";

export const Console: React.FC = () => {
  const { currentExecutionLogs: messages, clearCurrentExecutionLogs: clearMessages } = useLocalExecution();
  const { currentScene, generating, messages: consoleMessages } = useAppStore((state) => state);
  const { updateMapAssetData } = useLocalScenes();
  const { get: getMapAsset } = useLocalMapAssets();

  const { mutate: generateScene } = useGenerateScene(async (data) => {
    if (!currentScene?.id) { return; }
    console.log(data.reasoning);
    await updateMapAssetData(currentScene.id, data.map);
    getMapAsset(currentScene.id);
  });

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

  const onSubmit = (value: string) => {
    if (value.startsWith('/generate-scene')) {
      const sceneData = value.slice('/generate-scene'.length).trim();
      generateScene({
        inputText: sceneData,
      });
    }
  };

  return (
    <Container>
      <ControlsContainer>
        <ClearButton onClick={clearMessages}>
          <StopOutlined />
        </ClearButton>
      </ControlsContainer>
      <ConsoleContainer>
        { !!generating && <LoadingText text={`Generating ${generating}`} /> }
        {[...messages, ...consoleMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((message, index) => (
          <ConsoleMessage key={index}>
            <ConsoleDate>{formatCreatedAt(message.createdAt)}</ConsoleDate>
            <ConsoleContent>
              {message.nodeType} {JSON.stringify(message.inputData)}
            </ConsoleContent>
          </ConsoleMessage>
        ))}
      </ConsoleContainer>
      <CustomAutoComplete onSubmit={onSubmit} />
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

const ClearButton = styled.button`
  background: none; 
  border: none; 
  cursor: pointer; 
  color: ${(props) => props.theme.color.text}; 
  font-size: 14px; 
  padding: 5px; 
`;
