export type FormData = {
  name: string;
  schema: {
    name: string;
    type: string;
    required: boolean;
    default: any;
  }[];
};
