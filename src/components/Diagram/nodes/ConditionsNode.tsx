import { NodeResizer } from '@reactflow/node-resizer';
import { useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';

import preConditionsBg from '../../../assets/backgrounds/pre-conditions.svg'; 
import postConditionsBg from '../../../assets/backgrounds/post-conditions.svg';
import { IconType } from '../../../types/icon.type';
import { useDiagramStore } from '../../../state/DiagramStore';
import { getValueAfterUnderscore } from '../../../utils/get-value-after-underscore';
import { useNodeAndEdgeInstance } from '../../../hooks/use-story';

interface ConditionsNodeDataProps {
  agents?: { name: string }[]
}

interface CustomNodeProps extends NodeProps {
  icon?: IconType;
  data: ConditionsNodeDataProps;
}

export function ConditionsNode ({ type, selected, id, data }: CustomNodeProps) {

  const removeNode = useDiagramStore((s) => s.removeNode);
  const { deleteNode } = useNodeAndEdgeInstance();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      removeNode(id);
      deleteNode(getValueAfterUnderscore(id));
    }
  };

  useEffect(() => {
    if (selected) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <Container>
      <NodeResizer 
        minWidth={150} 
        minHeight={100}
        isVisible={selected} 
        lineClassName='node-resizer line' 
        handleClassName='node-resizer handle'
      />
      { type === 'pre-conditions' && <StyledHandle position={Position.Right} id="right" type="source" /> }
      { type === 'post-conditions' && <StyledHandle position={Position.Left} id="left" type="source" /> }
      <img src={type === 'pre-conditions' ? preConditionsBg : postConditionsBg} alt="bg" style={{ height: '100%' }} />
      <ContentContainer>
        {/* { data.agents?.map((agent, i) => ( */}
        { [1,2]?.map((agent, i) => (
          <div>
            <div className='agent-icon'></div>
            <span>{`Agent ${i+1}`}</span>
          </div>
        ))}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100px;
  min-width: 150px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface StyledHandleProps {
  position: string;
}

const StyledHandle = styled(Handle)<StyledHandleProps>`
  border: 2px solid #fff;
  background-color: #fff;
  ${({ position }) => {
    switch (position) {
      case 'top': return `margin-top: -10px`;
      case 'bottom': return `margin-bottom: -10px`;
      case 'left': return `margin-left: -10px`;
      case 'right': return `margin-right: -10px`;
      default: return ``;
    }
  }}
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > div {
    display: flex;
    align-items: center;
    width: 50%;
    padding: 4px 6px;
    border: 1px solid black;
    border-radius: 15px;
    &:not(:last-child) { margin-bottom: 5px; }
  }

  .agent-icon {
    width: 15px;
    height: 15px;
    background-color: black;
    border-radius: 10px;
    margin-right: 4px;
  }
`;