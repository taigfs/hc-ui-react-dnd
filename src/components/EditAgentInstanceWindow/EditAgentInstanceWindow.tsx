import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAgentInstance } from '../hooks/use-agent-instance';
import { PatchAgentInstanceDTO } from '../dtos/patch-agent-instance-dto';
import { ToolbarContainer } from './Toolbar/styles';
import { useDiagramStore } from '../state/DiagramStore';
import styled from 'styled-components';
import { getValueAfterUnderscore } from '../utils/get-value-after-underscore';
import { Button, Form, Select } from 'antd';

const { Option } = Select;

export const EditAgentInstanceWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control, } = useForm();
  const { patchAgentInstance } = useAgentInstance();
  const { selectedAgentInstance: agentInstance, setSelectedAgentInstance, updateAgentInstanceLabel, updateAgentInstanceActionData, agents } = useDiagramStore((s) => s);
  
  if (!agentInstance) { return null; }

  const id = getValueAfterUnderscore(agentInstance.id);

  setValue('label', agentInstance.data?.label);

  if (agentInstance.type === 'move') {
    setValue('actionData.moveToX', agentInstance.data?.actionData?.moveToX);
    setValue('actionData.moveToY', agentInstance.data?.actionData?.moveToY);
    setValue('actionData.agent', agentInstance.data?.actionData?.agent);
  }

  if (agentInstance.type === 'script') {
    setValue('scriptUrl', agentInstance.data?.actionData?.scriptUrl);
  }

  const handleAddAgent = (value: any) => {
    const agentId = Number(value);
    // if (!selectedAgents.includes(agentId)) {
    //   setSelectedAgents(prev => [...prev, agentId]);
    // }
  };

  const handleRemoveAgent = (agentId: number) => {
    // setSelectedAgents(prev => prev.filter(id => id !== agentId));
  };

  const onSubmit = (data: any) => {
    if (data.actionData?.moveToX && data.actionData?.moveToY) {
      data.actionData.moveToX = Number(data.actionData?.moveToX);
      data.actionData.moveToY = Number(data.actionData?.moveToY);
    }

    const dto: PatchAgentInstanceDTO = {
      id,
      updates: {
        label: data.label,
        x: agentInstance.position.x,
        y: agentInstance.position.y,
        data: {
          ...agentInstance.data,
          actionData: data.actionData,
        }
      }
    };
    patchAgentInstance(dto);
    updateAgentInstanceLabel(agentInstance.id, data.label);
    updateAgentInstanceActionData(agentInstance.id, data.actionData)
    setSelectedAgentInstance(null);
  };

  return (
    <StyledToolbarContainer>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Agent Instance">
          <StyledInput value={agentInstance.id} disabled />
        </Form.Item>
        <Form.Item label="Type">
          <StyledInput value={agentInstance.type} disabled />
        </Form.Item>
        <Form.Item label="Label">
          <StyledInput {...register('label')} placeholder="Label" />
        </Form.Item>
        {agentInstance.type === 'move' && (
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
                  <StyledSelect {...field}>
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

        {agentInstance.type === 'script' && (
          <>
            <StyledInput {...register('scriptUrl')} placeholder="Script URL" />
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
