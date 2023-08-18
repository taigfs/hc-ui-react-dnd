export interface PatchNodeDTO {
  id: number;
  updates: {
    type?: string;
    x: number;
    y: number;
    label?: string;
  }
}
