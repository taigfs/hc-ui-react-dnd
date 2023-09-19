import { NodeInstance } from "../interfaces/NodeInstance";

export const nodeInstancesToHandsontableData = (nodes: NodeInstance[]) => {
  
  // Cabeçalho
  const headers = ['ID', 'Type', 'X', 'Y', 'Label', 'Data'];
  const dataRows = nodes.map((instance) => [
    instance.id,
    instance.type,
    instance.x,
    instance.y,
    instance.label,
    JSON.stringify(instance.data),
  ]);

  return [headers, ...dataRows];
};