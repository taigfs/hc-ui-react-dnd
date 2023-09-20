import { NodeProps } from "reactflow";
import { ConditionsNode } from "./ConditionsNode";

export function PreConditionsNode (props: NodeProps) {
  return ConditionsNode({...props, icon: 'pre-conditions'});
}

export function PostConditionsNode (props: NodeProps) {
  return ConditionsNode({...props, icon: 'post-conditions'});
}