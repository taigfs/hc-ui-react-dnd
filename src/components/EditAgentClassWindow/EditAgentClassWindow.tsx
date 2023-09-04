import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Form, Select } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { PatchAgentInstanceDTO } from '../../dtos/patch-agent-instance-dto';
import { useDiagramStore } from '../../state/DiagramStore';
import { useAgentInstance } from '../../hooks/use-story';
import { useBoardStore } from '../../state/BoardStore';
import styled from 'styled-components';
import { useAgentClass } from '../../hooks/use-agent-class';
import { useAppStore } from '../../state/AppStore';
import { StyledInput, StyledToolbarContainer } from '../EditAgentInstanceWindow/styles';
import { AddAttrButton, FieldContainer, SmallInput, StyledSelect } from './styles';

const { Option } = Select;

export const EditAgentClassWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control,  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schema'
  });
  const { currentProject, currentAgentClass: agentClass } = useAppStore((s) => s);
  const { patch } = useAgentInstance(currentProject?.id || 0);
  const { setSelectedAgentIndex, updateAgentPositionName } = useBoardStore((s) => s);
  const { agentClasses } = useAgentClass(currentProject?.id || 0);

  useEffect(() => {
    console.log(agentClass);
    
    if (!agentClass){ return; }
    
    const parsedSchema = JSON.parse(agentClass.schema);
    const schemaArray = Object.keys(parsedSchema).map((key) => ({
      name: key,
      ...parsedSchema[key]
    }));

    setValue('name', agentClass.name);
    setValue('schema', schemaArray);
  }, [agentClass, setValue]);

  if (!agentClass) { return null; }

  const onSubmit = (data: any) => {
    
    // const dto: PatchAgentInstanceDTO = {
    //   id: agentInstance.id,
    //   updates: {
    //     data: {
    //       name: data.name,
    //       x: agentInstance.data.x,
    //       y: agentInstance.data.y,
    //     },
    //     agentSpriteId: agentInstance.agentSpriteId,
    //     agentClassId: data.agentClassId,
    //   }
    // };

    // patch.mutate(dto);
    // updateAgentInstance({...agentInstance, data: { ...agentInstance.data, name: data.name }});
    // updateAgentPositionName(agentInstance.id, data.name);
    // setSelectedAgentInstance(null);
    // setSelectedAgentIndex(null);
  };

  return (
    <StyledToolbarContainer style={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Agent Class">
          <StyledInput value={agentClass.id} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <StyledInput {...register('name')} placeholder="Name" />
        </Form.Item>
        <h3>Schema</h3>
        {fields.map((field, index) => (
          <FieldContainer key={field.id}>
            <Form.Item label="Name" style={{ marginBottom: 4 }}>
              <SmallInput {...register(`schema.${index}.name`)} />
            </Form.Item>

            <Form.Item label="Type" style={{ marginBottom: 4 }}>
              <Controller
                control={control}
                name={`schema.${index}.type`}
                render={({ field }) => (
                  <StyledSelect size='small' {...field}>
                    <Select.Option value="string" key="string">
                      String
                    </Select.Option>
                    <Select.Option value="number" key="number">
                      Number
                    </Select.Option>
                  </StyledSelect>
                )}
              />
            </Form.Item>

            <Form.Item label="Required" style={{ marginBottom: 4 }}>
              <input type="checkbox" {...register(`schema.${index}.required`)} />
            </Form.Item>

            <Form.Item label="Default" style={{ marginBottom: 4 }}>
              <SmallInput {...register(`schema.${index}.default`)} />
            </Form.Item>

            <Button onClick={() => remove(index)} icon={<DeleteOutlined />} style={{ marginBottom: 4, marginLeft: 'auto' }} />
          </FieldContainer>
        ))}
        <AddAttrButton type="default" onClick={() => append({ name: '', type: 'string', required: false, default: '' })}>
          Add Attribute
        </AddAttrButton>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Update</Button>
      </Form>
    </StyledToolbarContainer>
  );
};