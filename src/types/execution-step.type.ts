type ExecutionStepType = 'run';

export interface ExecutionStep {
  type: ExecutionStepType;
  nodes: string[]; // node ids;
}