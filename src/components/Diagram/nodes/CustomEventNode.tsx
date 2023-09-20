import { NodeProps } from "reactflow";
import { EventNode } from "./EventNode";

export function StartEventNode (props: NodeProps) {
  return EventNode({...props, icon: 'start-event'});
}

export function EndEventNode (props: NodeProps) {
  return EventNode({...props, icon: 'end-event'});
}