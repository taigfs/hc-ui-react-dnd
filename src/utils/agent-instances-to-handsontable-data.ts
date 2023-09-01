import { AgentInstance } from "../interfaces/AgentInstance";

export const agentInstancesToHandsontableData = (agentInstances: AgentInstance[]) => {
  // Cabeçalho
  const headers = ['ID', 'Class ID', 'Name', 'Sprite ID', 'X', 'Y'];

  // Mapeando os agentInstances para o formato desejado
  const dataRows = agentInstances.map((instance) => [
    instance.id,
    instance.agentClassId,
    instance.data.name,
    instance.agentSpriteId,
    instance.data.x,
    instance.data.y,
  ]);

  console.log('dataRows', dataRows)

  // Combina o cabeçalho com as linhas de dados
  return [headers, ...dataRows];
};