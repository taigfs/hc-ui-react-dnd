import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ToolbarContainer } from './Toolbar/styles';
import { useDiagramStore } from '../state/DiagramStore';
import styled from 'styled-components';
import { Button, Form, Select } from 'antd';
import { useLocalNodes } from '../hooks/use-local-nodes';
import { NodeInstance } from '../interfaces/NodeInstance';
import { useLocalAgents } from '../hooks/use-local-agents';

const { Option } = Select;

export const EditNodeWindow: React.FC = () => {
  
  const { register, handleSubmit, setValue, control, } = useForm();
  const { update: updateNode, get: getNode } = useLocalNodes();
  const { agents } = useLocalAgents();
  const { selectedNode: node, setSelectedNode, updateNodeLabel, updateNodeActionData } = useDiagramStore((s) => s);

  useEffect(() => {
        if (!node) { return; }
    setValue('label', node.data?.label);

    if (node.type === 'move') {
      setValue('actionData.moveToX', node.data?.actionData?.moveToX || 0);
      setValue('actionData.moveToY', node.data?.actionData?.moveToY || 0);
      setValue('actionData.agent', node.data?.actionData?.agent || agents?.[0]?.id);
    }

    if (node.type === 'script') {
      setValue('scriptUrl', node.data?.actionData?.scriptUrl);
    }

    if (node.type === 'browser-open') {
      setValue('actionData.url', node.data?.actionData?.url);
    }

    if (node.type === 'browser-click') {
      setValue('actionData.selector', node.data?.actionData?.selector);
    }

    if (node.type === 'browser-type') {
      setValue('actionData.selector', node.data?.actionData?.selector);
      setValue('actionData.text', node.data?.actionData?.text);
    }
  
  }, [node]);

  if (!node) { return null; }

  const onSubmit = async (data: any) => {
    if (!node.id) {
      throw new Error('Node id is required');
    }

    if (data.actionData?.moveToX && data.actionData?.moveToY) {
      data.actionData.moveToX = Number(data.actionData?.moveToX);
      data.actionData.moveToY = Number(data.actionData?.moveToY);
    }

    const curNodeInstance = await getNode(node.id);
    if (!curNodeInstance) {
      throw new Error('Node not found');
    }

    console.log(data.actionData);

    const updatedNodeInstance: NodeInstance = {
      ...curNodeInstance,
      label: data.label,
      x: node.position.x,
      y: node.position.y,
      data: {
        ...curNodeInstance.data,
        actionData: data.actionData,
      }
    };

    // update db
    updateNode(updatedNodeInstance);

    // update reactflow state
    updateNodeLabel(node.id, data.label);
    updateNodeActionData(node.id, data.actionData)
    setSelectedNode(null);
  };

  return (
    <StyledToolbarContainer>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Node">
          <StyledInput value={node.id} disabled />
        </Form.Item>
        <Form.Item label="Type">
          <StyledInput value={node.type} disabled />
        </Form.Item>
        <Form.Item label="Label">
          <StyledInput {...register('label')} placeholder="Label" />
        </Form.Item>
        {node.type === 'move' && (
          <>
            <Form.Item label="Move to X">
              <StyledInput {...register('actionData.moveToX')} type="number" placeholder="Move to X" defaultValue={0} />
            </Form.Item>
            <Form.Item label="Move to Y">
              <StyledInput {...register('actionData.moveToY')} type="number" placeholder="Move to Y" defaultValue={0} />
            </Form.Item>
            <Form.Item label="Agent">
              <Controller
                control={control}
                name="actionData.agent"
                defaultValue={agents?.[0]?.id}
                render={({ field }) => (
                  <StyledSelect {...field} placeholder="Select an Agent">
                    {agents.map((agent) => (
                      <Select.Option value={agent.id} key={agent.id}>
                        {agent.data.name} #{agent.id}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                )}
              />
            </Form.Item>
          </>
        )}

        {node.type === 'script' && (
          <>
            <StyledInput {...register('scriptUrl')} placeholder="Script URL" />
          </>
        )}

        {node.type === 'browser-open' && (
          <>
            <Form.Item label="URL">
              <StyledInput {...register('actionData.url')} placeholder="URL" />
            </Form.Item>
          </>
        )}

        {node.type === 'browser-click' && (
          <>
            <Form.Item label="Selector">
              <StyledInput {...register('actionData.selector')} placeholder="Selector" />
            </Form.Item>
          </>
        )}

        {node.type === 'browser-type' && (
          <>
            <Form.Item label="Selector">
              <StyledInput {...register('actionData.selector')} placeholder="Selector" />
            </Form.Item>
            <Form.Item label="Text">
              <StyledInput {...register('actionData.text')} placeholder="Text" />
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </StyledToolbarContainer>
  );
};

const StyledH4 = styled.h4`
  position: sticky;
  top: 0;
  background-color: #151515;
  z-index: 10;
  padding: 8px 0 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const StyledToolbarContainer = styled(ToolbarContainer)`
  padding-bottom: 8px;
  padding-top: 8px;
`;
