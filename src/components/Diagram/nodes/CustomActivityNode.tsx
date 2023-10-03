import { NodeProps } from "reactflow";
import { ActivityNode } from "./ActivityNode";

export function AddActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'add'});
}

export function ScriptActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'script'});
}

export function MoveActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'move'});
}

export function TimerActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'timer'});
}

export function BrowserOpenActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'browser-open'});
}

export function BrowserCloseActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'browser-close'});
}

export function BrowserClickActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'browser-click'});
}

export function BrowserTypeActivityNode (props: NodeProps) {
  return ActivityNode({...props, icon: 'browser-type'});
}