import { Edge, Node } from "reactflow";
import { ExecutionStep } from "../types/execution-step.type";

interface DiagramConfigurationProps {
  nodes: Node[];
  edges: Edge[];
  execution: ExecutionStep[];
}

export const agentStoreScene = {
  execution: [
    { type: 'run', nodes: ["9bce79ef-4b8b-46a2-89de-9a36732a2cc0"] },
    { type: 'run', nodes: ["e9771a35-8f6e-41b5-8fad-1f1b5652c0d2"] },
    { 
      type: 'run', 
      nodes: ["590504f4-1f2d-43d7-8155-b428ceef9570", "9ff4e545-b83d-4722-a4fe-238ffbb8ab37"] 
    },
    { type: 'run', nodes: ["6b099961-f3b5-44c0-8cfc-b10de22efece"] },
    { type: 'run', nodes: ["b3e20383-174c-4dc4-ab6b-5491108ecc53"] }
  ],
  nodes: [
    {
        "id": "e9771a35-8f6e-41b5-8fad-1f1b5652c0d2",
        "type": "add",
        "position": {
            "x": 403.95612694689464,
            "y": 297.93419042034196
        },
        "data": {
            "label": "Add Agent1"
        },
        "width": 154,
        "height": 104,
        "selected": false,
        "positionAbsolute": {
            "x": 403.95612694689464,
            "y": 297.93419042034196
        },
        "dragging": false
    },
    {
        "id": "590504f4-1f2d-43d7-8155-b428ceef9570",
        "type": "move",
        "position": {
            "x": 683,
            "y": 186
        },
        "data": {
            "label": "Move to Store"
        },
        "width": 154,
        "height": 104,
        "selected": false,
        "positionAbsolute": {
            "x": 683,
            "y": 186
        },
        "dragging": false
    },
    {
        "id": "9ff4e545-b83d-4722-a4fe-238ffbb8ab37",
        "type": "script",
        "position": {
            "x": 678,
            "y": 427.99999999999994
        },
        "data": {
            "label": "Call MakeOrder"
        },
        "width": 154,
        "height": 104,
        "selected": false,
        "positionAbsolute": {
            "x": 678,
            "y": 427.99999999999994
        },
        "dragging": false
    },
    {
        "id": "6b099961-f3b5-44c0-8cfc-b10de22efece",
        "type": "move",
        "position": {
            "x": 950.6223715308796,
            "y": 185.8111857654398
        },
        "data": {
            "label": "Move out of the Store"
        },
        "width": 157,
        "height": 104,
        "selected": false,
        "positionAbsolute": {
            "x": 950.6223715308796,
            "y": 185.8111857654398
        },
        "dragging": false
    },
    {
        "id": "b3e20383-174c-4dc4-ab6b-5491108ecc53",
        "type": "end-event",
        "position": {
            "x": 1215.8729252464136,
            "y": 360.9650989257645
        },
        "data": {},
        "width": 50,
        "height": 50,
        "selected": false,
        "positionAbsolute": {
            "x": 1215.8729252464136,
            "y": 360.9650989257645
        },
        "dragging": false
    },
    {
        "id": "9bce79ef-4b8b-46a2-89de-9a36732a2cc0",
        "type": "start-event",
        "position": {
            "x": 249,
            "y": 325
        },
        "data": {},
        "width": 50,
        "height": 50,
        "selected": false,
        "positionAbsolute": {
            "x": 249,
            "y": 325
        },
        "dragging": false
    },
    {
        "id": "3daeabc6-4d2a-48db-8a44-be02bfc50886",
        "type": "pre-conditions",
        "position": {
            "x": -46.62177491089014,
            "y": 132.72768145994564
        },
        "data": {},
        "width": 152,
        "height": 100,
        "selected": false,
        "dragging": false,
        "style": {
            "width": 152,
            "height": 100
        },
        "resizing": false,
        "positionAbsolute": {
            "x": -46.62177491089014,
            "y": 132.72768145994564
        }
    },
    {
        "id": "ff4f7209-c886-4760-ad55-b3a855ed2d4e",
        "type": "post-conditions",
        "position": {
            "x": 1443.0461210828066,
            "y": 163.00152805400677
        },
        "data": {},
        "width": 178,
        "height": 119,
        "selected": false,
        "positionAbsolute": {
            "x": 1443.0461210828066,
            "y": 163.00152805400677
        },
        "dragging": false,
        "style": {
            "width": 178,
            "height": 119
        },
        "resizing": false
    }
],
  edges: [
    {
        "type": "default",
        "source": "9bce79ef-4b8b-46a2-89de-9a36732a2cc0",
        "sourceHandle": "right",
        "target": "e9771a35-8f6e-41b5-8fad-1f1b5652c0d2",
        "targetHandle": "left",
        "id": "reactflow__edge-9bce79ef-4b8b-46a2-89de-9a36732a2cc0right-e9771a35-8f6e-41b5-8fad-1f1b5652c0d2left"
    },
    {
        "type": "default",
        "source": "6b099961-f3b5-44c0-8cfc-b10de22efece",
        "sourceHandle": "right",
        "target": "b3e20383-174c-4dc4-ab6b-5491108ecc53",
        "targetHandle": "left",
        "id": "reactflow__edge-6b099961-f3b5-44c0-8cfc-b10de22efeceright-b3e20383-174c-4dc4-ab6b-5491108ecc53left"
    },
    {
        "type": "default",
        "source": "590504f4-1f2d-43d7-8155-b428ceef9570",
        "sourceHandle": "right",
        "target": "6b099961-f3b5-44c0-8cfc-b10de22efece",
        "targetHandle": "left",
        "id": "reactflow__edge-590504f4-1f2d-43d7-8155-b428ceef9570right-6b099961-f3b5-44c0-8cfc-b10de22efeceleft"
    },
    {
        "type": "default",
        "source": "e9771a35-8f6e-41b5-8fad-1f1b5652c0d2",
        "sourceHandle": "right",
        "target": "590504f4-1f2d-43d7-8155-b428ceef9570",
        "targetHandle": "left",
        "id": "reactflow__edge-e9771a35-8f6e-41b5-8fad-1f1b5652c0d2right-590504f4-1f2d-43d7-8155-b428ceef9570left"
    },
    {
        "type": "default",
        "source": "e9771a35-8f6e-41b5-8fad-1f1b5652c0d2",
        "sourceHandle": "right",
        "target": "9ff4e545-b83d-4722-a4fe-238ffbb8ab37",
        "targetHandle": "left",
        "id": "reactflow__edge-e9771a35-8f6e-41b5-8fad-1f1b5652c0d2right-9ff4e545-b83d-4722-a4fe-238ffbb8ab37left"
    },
    {
        "type": "default",
        "source": "9ff4e545-b83d-4722-a4fe-238ffbb8ab37",
        "sourceHandle": "right",
        "target": "b3e20383-174c-4dc4-ab6b-5491108ecc53",
        "targetHandle": "left",
        "id": "reactflow__edge-9ff4e545-b83d-4722-a4fe-238ffbb8ab37right-b3e20383-174c-4dc4-ab6b-5491108ecc53left"
    },
    {
        "type": "default",
        "source": "ff4f7209-c886-4760-ad55-b3a855ed2d4e",
        "sourceHandle": "left",
        "target": "b3e20383-174c-4dc4-ab6b-5491108ecc53",
        "targetHandle": "right",
        "id": "reactflow__edge-ff4f7209-c886-4760-ad55-b3a855ed2d4eleft-b3e20383-174c-4dc4-ab6b-5491108ecc53right"
    },
    {
        "type": "default",
        "source": "3daeabc6-4d2a-48db-8a44-be02bfc50886",
        "sourceHandle": "right",
        "target": "9bce79ef-4b8b-46a2-89de-9a36732a2cc0",
        "targetHandle": "left",
        "id": "reactflow__edge-3daeabc6-4d2a-48db-8a44-be02bfc50886right-9bce79ef-4b8b-46a2-89de-9a36732a2cc0left"
    }
],
};

export const DiagramConfiguration = {
  nodes: agentStoreScene.nodes,
  edges: agentStoreScene.edges,
  execution: agentStoreScene.execution,
}