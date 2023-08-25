import { NodeInstance } from "../interfaces/NodeInstance";

export const nodesToHandsontableData = (nodes: NodeInstance[]) => {
  
  // Cabeçalho
  const headers = ['ID', 'Type', 'X', 'Y', 'Label', 'Data'];
  const dataRows = nodes.map((instance) => [
    instance.id,
    instance.type,
    instance.x,
    instance.y,
    instance.label,
    instance.data,
  ]);

  console.log('dataRows', dataRows)

  return [headers, ...dataRows];
};