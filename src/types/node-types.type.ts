import { ActivityNode } from "../components/Diagram/nodes/ActivityNode";
import { AddActivityNode, MoveActivityNode, ScriptActivityNode, TimerActivityNode, BrowserClickActivityNode, BrowserCloseActivityNode, BrowserOpenActivityNode, BrowserTypeActivityNode } from "../components/Diagram/nodes/CustomActivityNode";
import { PostConditionsNode, PreConditionsNode } from "../components/Diagram/nodes/CustomConditionsNode";
import { EndEventNode, StartEventNode } from "../components/Diagram/nodes/CustomEventNode";

export const NODE_TYPES = {
  square: ActivityNode,
  add: AddActivityNode,
  timer: TimerActivityNode,
  script: ScriptActivityNode,
  move: MoveActivityNode,
  'start-event': StartEventNode,
  'end-event': EndEventNode,
  'pre-conditions': PreConditionsNode,
  'post-conditions': PostConditionsNode,
  'browser-open': BrowserOpenActivityNode,
  'browser-close': BrowserCloseActivityNode,
  'browser-click': BrowserClickActivityNode,
  'browser-type': BrowserTypeActivityNode,
};