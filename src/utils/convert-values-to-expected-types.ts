export function convertValuesToExpectedTypes(values: any, agentClassSchema: any): any {
  Object.keys(agentClassSchema).forEach(fieldName => {
    if (agentClassSchema[fieldName].type === 'number' && typeof values[fieldName] === 'string') {
      values[fieldName] = parseFloat(values[fieldName]);
    }
  });
  return values;
}
