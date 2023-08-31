import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Select } from 'antd';
import { PatchAgentInstanceDTO } from '../../dtos/patch-agent-instance-dto';
import { useDiagramStore } from '../../state/DiagramStore';
import { useAgentInstance } from '../../hooks/use-story';
import { StyledInput, StyledToolbarContainer } from './styles';
import { useBoardStore } from '../../state/BoardStore';

const { Option } = Select;

export const EditAgentInstanceWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control, } = useForm();
  const { patch } = useAgentInstance();
  const { agents, selectedAgentInstance: agentInstance, setSelectedAgentInstance, updateAgentInstance } = useDiagramStore((s) => s);
  const { setSelectedAgentIndex } = useBoardStore((s) => s);
  
  if (!agentInstance) { return null; }

  setValue('name', agentInstance.data?.name);

  const onSubmit = (data: any) => {
    
    const dto: PatchAgentInstanceDTO = {
      id: agentInstance.id,
      updates: {
        data: {
          name: data.name,
          x: agentInstance.data.x,
          y: agentInstance.data.y,
        },
        agentSpriteId: agentInstance.agentSpriteId,
      }
    };

    patch.mutate(dto);
    updateAgentInstance({...agentInstance, data: { ...agentInstance.data, name: data.name }});
    setSelectedAgentInstance(null);
    setSelectedAgentIndex(null);
  };

  return (
    <StyledToolbarContainer>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Agent Instance">
          <StyledInput value={agentInstance.id} disabled />
        </Form.Item>
        <Form.Item label="Name">
          <StyledInput {...register('name')} placeholder="Name" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </StyledToolbarContainer>
  );
};