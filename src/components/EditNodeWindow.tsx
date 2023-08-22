import React from 'react';
import { useForm } from 'react-hook-form';
import { useNodeAndEdgeInstance } from '../hooks/use-story';
import { PatchNodeDTO } from '../dtos/patch-node-dto';
import { ToolbarContainer } from './Toolbar/styles';
import { useDiagramStore } from '../state/DiagramStore';
import styled from 'styled-components';
import { getValueAfterUnderscore } from '../utils/get-value-after-underscore';
import { Button, Select } from 'antd';

const { Option } = Select;

export const EditNodeWindow: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { patchNode } = useNodeAndEdgeInstance();
  const { selectedNode: node, setSelectedNode, updateNodeLabel, agents } = useDiagramStore((s) => s);
  
  if (!node) { return null; }
  console.log(node);

  const id = getValueAfterUnderscore(node.id);

  setValue('label', node.data?.label);

  if (node.type === 'move') {
    setValue('actionData.moveToX', node.data?.actionData?.moveToX);
    setValue('actionData.moveToY', node.data?.actionData?.moveToY);
    setValue('actionData.agent', node.data?.actionData?.agent);
  }

  if (node.type === 'script') {
    setValue('scriptUrl', node.data?.actionData?.scriptUrl);
  }


  const onSubmit = (data: any) => {
    if (data.actionData?.moveToX && data.actionData?.moveToY) {
      data.actionData.moveToX = Number(data.actionData?.moveToX);
      data.actionData.moveToY = Number(data.actionData?.moveToY);
    }

    const dto: PatchNodeDTO = {
      id,
      updates: {
        label: data.label,
        x: node.position.x,
        y: node.position.y,
        data: {
          ...node.data,
          actionData: data.actionData,
        }
      }
    };
    console.log(dto);
    patchNode(dto);
    updateNodeLabel(node.id, data.label);
    setSelectedNode(null);
  };

  return (
    <StyledToolbarContainer>
      <StyledH4>Edit Node #{id}</StyledH4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {node.type === 'move' && (
          <>
            <StyledInput {...register('label')} placeholder="Label" />
            <StyledInput {...register('actionData.moveToX')} type="number" placeholder="Move to X" />
            <StyledInput {...register('actionData.moveToY')} type="number" placeholder="Move to Y" />
            <StyledSelect {...register('actionData.agent')} placeholder="Agent">
              {agents.map((agent) => (
                <Option key={agent.id} value={agent.id}>{agent.name}</Option>
              ))}
            </StyledSelect>
          </>
        )}

        {node.type === 'script' && (
          <>
            <StyledInput {...register('label')} placeholder="Label" />
            <StyledInput {...register('scriptUrl')} placeholder="Script URL" />
          </>
        )}

        <Button type="primary" htmlType="submit">Update</Button>
      </form>
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
  margin-bottom: 8px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 8px;
`;

const StyledToolbarContainer = styled(ToolbarContainer)`
  padding-bottom: 8px;
`;
