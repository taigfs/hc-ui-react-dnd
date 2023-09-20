export interface IResponseData {
  success: boolean;
  errorMessage?: string;
  changes?: any[];
  currentRevision?: number;
  needsResync?: boolean;
  partial?: boolean;
  clientIdentity?: string;
}