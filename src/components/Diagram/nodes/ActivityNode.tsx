import { NodeProps, Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';
import { useEffect, useState } from 'react';
import { IconType } from '../../../types/icon.type';
import { DiagramIcon } from '../DiagramIcon';
import { useDiagramStore } from '../../../state/DiagramStore';
import { useNodeAndEdgeInstance } from '../../../hooks/use-story';
import { getValueAfterUnderscore } from '../../../utils/get-value-after-underscore';
import loadingGif from '../../../assets/loading.gif';

interface ActivityNodeData {
  executing?: boolean;
  loading?: boolean;
  label: string;
}
interface ActivityNodeProps extends NodeProps {
  icon?: IconType;
  data: ActivityNodeData;
}

export function ActivityNode ({ selected, data, id, icon }: ActivityNodeProps) {

  const [editMode, setEditMode] = useState<boolean>(false);
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const removeNode = useDiagramStore((s) => s.removeNode);
  const { deleteNode } = useNodeAndEdgeInstance();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      removeNode(id);
      deleteNode(getValueAfterUnderscore(id));
    }
  };

  useEffect(() => {
    if (!selected && editMode) { setEditMode(false); }

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
    <Container onDoubleClick={() => setEditMode(true)} executing={data?.executing || false}>
      { !!icon && <StyledIcon name={icon} />}
      <NodeResizer 
        minWidth={150} 
        minHeight={100}
        isVisible={selected} 
        lineClassName='node-resizer line' 
        handleClassName='node-resizer handle'
      />
      <StyledHandle position={Position.Right} id="right" type="source" />
      <StyledHandle position={Position.Left} id="left" type="source" />
      <StyledHandle position={Position.Top} id="top" type="source" />
      <StyledHandle position={Position.Bottom} id="bottom" type="source" />
      {selected && editMode ? (
        <div>
          <input type="text" value={data?.label} onChange={(e) => updateNodeLabel(id, e.target.value)} />
        </div>
        )  :
        (data?.loading ? <StyledImg src={loadingGif} alt="Loading" /> : <StyledLabel>{data?.label}</StyledLabel>)
      }
    </Container>
  );
}

interface ContainerProps {
  executing: boolean;
}

const Container = styled.div<ContainerProps>`
  min-height: 100px;
  min-width: 150px;
  background-color: ${({ executing }) => executing ? `#2dd862` : `white`};
  border-radius: 5px;
  border: 2px solid black;
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
  border: 1px solid #fff;
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

const StyledLabel = styled.div`
  text-align: center;
`;

interface StyledIconProps {
  name: string;
}
const StyledIcon = styled(DiagramIcon)<StyledIconProps>`
  position: absolute;
  top: 10px;
  left: 10px;
  ${({ name }) => {
    if (name === 'script' || name === 'timer') { return `width: 18px;` }
    return `width: 32px;`
  }}
`;

const StyledImg = styled.img`
  width: 32px;
  height: 32px;
  margin: auto;
`;