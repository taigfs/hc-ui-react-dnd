import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Select } from 'antd';
import { useDiagramStore } from '../../state/DiagramStore';
import { StyledInput, StyledToolbarContainer } from './styles';
import styled from 'styled-components';
import { useAppStore } from '../../state/AppStore';
import { convertValuesToExpectedTypes } from '../../utils/convert-values-to-expected-types';
import { useLocalAgentClasses } from '../../hooks/use-local-agent-classes';
import { useLocalAgents } from '../../hooks/use-local-agents';

const { Option } = Select;

export const EditAgentInstanceWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control  } = useForm();
  const { currentProject } = useAppStore((s) => s);
  const { selectedAgentInstance: agentInstance, setSelectedAgentInstance, updateAgentInstance } = useDiagramStore((s) => s);
  const { agentClasses } = useLocalAgentClasses();
  const { update } = useLocalAgents();

  const currentAgentClass = agentClasses?.find((ac) => ac.id === agentInstance?.agentClassId);
  const agentClassSchema = currentAgentClass ? JSON.parse(currentAgentClass?.schema || '{}') : {};

  useEffect(() => {
    if (!agentInstance){ return; }
    setValue('name', agentInstance.data?.name);
    setValue('agentClassId', agentInstance.agentClassId);
    Object.keys(agentClassSchema).forEach(fieldName => {
      setValue(`values.${fieldName}`, agentInstance.values?.[fieldName]);
    });
  }, [agentInstance, setValue]);

  if (!agentInstance) { return null; }

  const onSubmit = (data: any) => {
    
    if (!agentInstance.id) {
      throw new Error('Agent id is required');
    }

    const values = convertValuesToExpectedTypes(data.values, agentClassSchema);

    const updatedAgentInstance = {
      ...agentInstance,
      data: {
        ...agentInstance.data,
        name: data.name,
      },
      agentClassId: data.agentClassId,
      values,
    };

    update(updatedAgentInstance);
    setSelectedAgentInstance(null);
  };

  return (
    <StyledToolbarContainer style={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Agent Instance">
          <StyledInput value={agentInstance.id} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <StyledInput {...register('name')} placeholder="Name" />
        </Form.Item>
        <Form.Item label="Class">
          <Controller
            control={control}
            name="agentClassId"
            defaultValue={agentInstance.agentClassId}
            render={({ field }) => (
              <StyledSelect {...field}>
                {agentClasses?.map((agentClass) => (
                  <Select.Option value={agentClass.id} key={agentClass.id}>
                    {agentClass.name} #{agentClass.id}
                  </Select.Option>
                ))}
              </StyledSelect>
            )}
          />
        </Form.Item>
        {Object.keys(agentClassSchema).map(fieldName => (
          <Form.Item key={fieldName} label={fieldName}>
            {agentClassSchema[fieldName].type === 'string' ? (
              <StyledInput {...register(`values.${fieldName}`)} placeholder={fieldName} defaultValue={agentClassSchema[fieldName].default} />
            ) : (
              <StyledInput type="number" {...register(`values.${fieldName}`)} placeholder={fieldName} defaultValue={agentClassSchema[fieldName].default} />
            )}
          </Form.Item>
        ))}
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Update</Button>
      </Form>
    </StyledToolbarContainer>
  );
};

const StyledSelect = styled(Select)`
  width: 100%;
`;