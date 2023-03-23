export interface Story {
  id?: number;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  scene: {
    name: string;
  };
}
