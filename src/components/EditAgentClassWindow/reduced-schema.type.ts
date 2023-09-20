export type ReducedSchema = {
  [key: string]: {
    type: string;
    required: boolean;
    default: any;
  };
};