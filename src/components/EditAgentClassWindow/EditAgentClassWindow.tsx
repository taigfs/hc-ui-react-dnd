import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Select } from 'antd';
import { PatchAgentInstanceDTO } from '../../dtos/patch-agent-instance-dto';
import { useDiagramStore } from '../../state/DiagramStore';
import { useAgentInstance } from '../../hooks/use-story';
import { useBoardStore } from '../../state/BoardStore';
import styled from 'styled-components';
import { useAgentClass } from '../../hooks/use-agent-class';
import { useAppStore } from '../../state/AppStore';
import { StyledToolbarContainer } from '../EditAgentInstanceWindow/styles';

const { Option } = Select;

export const EditAgentClassWindow: React.FC = () => {
  const { register, handleSubmit, setValue, control,  } = useForm();
  const { currentProject } = useAppStore((s) => s);
  const { patch } = useAgentInstance(currentProject?.id || 0);
  const { agents, selectedAgentInstance: agentInstance, setSelectedAgentInstance, updateAgentInstance } = useDiagramStore((s) => s);
  const { setSelectedAgentIndex, updateAgentPositionName } = useBoardStore((s) => s);
  const { agentClasses } = useAgentClass(currentProject?.id || 0);

  useEffect(() => {
    console.log(agentInstance);
    if (!agentInstance){ return; }
    // setValue('name', agentInstance.data?.name);
    // setValue('agentClassId', agentInstance.agentClassId);
  }, [agentInstance, setValue]);

  if (!agentInstance) { return null; }

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
    <StyledToolbarContainer>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Agent Class">
          {/* <StyledInput value={agentClass.id} disabled /> */}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </StyledToolbarContainer>
  );
};

const StyledSelect = styled(Select)`
  width: 100%;
`;