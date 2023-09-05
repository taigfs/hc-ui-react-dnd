import { AgentInstance } from "../interfaces/AgentInstance";
import { AgentClassSchema } from "../types/AgentClassSchema";

export const agentClassSchemaToHandsontableData = (
  agentClassSchemaString: string | undefined,
  agentInstances: AgentInstance[]
) => {
  if (!agentClassSchemaString) {
    return [];
  }

  console.log(agentInstances);

  const agentClassSchema: AgentClassSchema = JSON.parse(agentClassSchemaString);

  // Cabeçalho dinâmico baseado nas chaves do esquema
  const headers = ['id', ...Object.keys(agentClassSchema)];

  // Mapeando os agentInstances para o formato desejado
  const dataRows = agentInstances.map((instance) => {
    const values = instance.values;
    return headers.map((header) => {

      if (header === 'id') {
        return instance.id;
      } else if (header === 'name') {
        return instance.data?.name;
      }

      const property = agentClassSchema[header];
      const value = values[header];
      if (property.type === 'number') {
        return value || 0;
      }
      return value || '';
    });
  });

  // Combina o cabeçalho com as linhas de dados
  return [headers, ...dataRows];
};