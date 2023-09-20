export interface IRequest {
  clientIdentity?: string | null;
  baseRevision: number;
  partial: boolean;
  changes: any[];
  syncedRevision: number;
}