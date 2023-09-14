import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Form, Select } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useAgentClass } from '../../hooks/use-agent-class';
import { useAppStore } from '../../state/AppStore';
import { StyledInput, StyledToolbarContainer } from '../EditAgentInstanceWindow/styles';
import { AddAttrButton, ErrorMessage, FieldContainer, SmallInput, StyledSelect } from './styles';
import { UpdateAgentClassDTO } from '../../dtos/update-agent-class-dto';
import { FormData } from './form-data.type';
import { ReducedSchema } from './reduced-schema.type';

const { Option } = Select;

export const EditAgentClassWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control, formState: { errors }  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schema'
  });
  const { currentProject, currentAgentClass: agentClass, setCurrentAgentClass } = useAppStore((s) => s);
  const { agentClasses, patch } = useAgentClass(currentProject?.id || 0);

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

  const onSubmit = (data: FormData) => {
    
    const reducedSchema: ReducedSchema = data.schema.reduce((acc: Record<string, any>, curr) => {
      acc[curr.name] = {
        type: curr.type,
        required: curr.required,
        default: curr.default
      };
      return acc;
    }, {});

    const agentClassData: UpdateAgentClassDTO = {
      id: agentClass.id,
      updates: {
        name: data.name,
        schema: JSON.stringify(reducedSchema),
        projectId: agentClass.projectId
      }
    };
    
    console.log(agentClassData);
    patch.mutate(agentClassData);

    // updateAgentInstance({...agentInstance, data: { ...agentInstance.data, name: data.name }});
    // updateAgentPositionName(agentInstance.id, data.name);
    // setSelectedAgentInstance(null);
  };

  return (
    <StyledToolbarContainer style={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit as any)}>
        <Form.Item label="Agent Class">
          <StyledInput value={agentClass.id} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <StyledInput {...register('name', { required: "Name is required" })} placeholder="Name" />
          {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
        </Form.Item>
        <h3>Schema</h3>
        {fields.map((field, index) => {
          const schemaError = ((errors.schema as unknown) as any[])?.[index];
          return (
            <FieldContainer key={field.id}>
              <Form.Item label="Name" style={{ marginBottom: 4 }}>
                <SmallInput {...register(`schema.${index}.name`, { required: "Attribute name is required" })} />
                {errors.schema && schemaError?.name && <ErrorMessage>{schemaError?.name.message as string}</ErrorMessage> }
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
                  rules={{ required: "Type is required" }}
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
          );
        })}
        <AddAttrButton type="default" onClick={() => append({ name: '', type: 'string', required: false, default: '' })}>
          Add Attribute
        </AddAttrButton>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={patch.isLoading}>Update</Button>
      </Form>
    </StyledToolbarContainer>
  );
};
