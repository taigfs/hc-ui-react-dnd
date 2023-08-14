export interface Story {
  id?: number;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  createdAt: string;
  scene: {
    name: string;
  };
}
