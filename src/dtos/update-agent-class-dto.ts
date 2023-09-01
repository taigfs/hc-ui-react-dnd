export interface UpdateAgentClassDTO {
  id: number;
  updates: {
    name: string;
    schema: string; // JSON stringified
  }
}