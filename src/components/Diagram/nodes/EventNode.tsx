import { NodeResizer } from '@reactflow/node-resizer';
import { useEffect } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { useDiagramStore } from '../../../state/DiagramStore';
import { IconType } from '../../../types/icon.type';
import { DiagramIcon } from '../DiagramIcon';
import { getValueAfterUnderscore } from '../../../utils/get-value-after-underscore';
import { useNodeAndEdgeInstance } from '../../../hooks/use-story';

interface EventNodeData {
  executing: boolean;
}

interface EventNodeProps extends NodeProps {
  data: EventNodeData;
  icon?: IconType;
}

export function EventNode ({ type, selected, id, data }: EventNodeProps) {

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
    <Container executing={data?.executing}>
      { !!type && <StyledIcon name={type as IconType} />}
      <NodeResizer 
        minWidth={150} 
        minHeight={100}
        isVisible={selected} 
        lineClassName='event-resizer line' 
        handleClassName='event-resizer handle'
        shouldResize={() => { return false; }}
      />
      <StyledHandle position={Position.Right} id="right" type="source" />
      <StyledHandle position={Position.Left} id="left" type="source" />
    </Container>
  );
}

interface ContainerProps {
  executing: boolean;
}

const Container = styled.div<ContainerProps>`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: ${({ executing }) => executing ? `#2dd862` : `white`};
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

interface StyledIconProps {
  name: string;
}
const StyledIcon = styled(DiagramIcon)<StyledIconProps>`
  height: calc(50px + 5px);
`;