import Dexie from "dexie";
import { Project } from "../interfaces/Project";
import "dexie-syncable";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";
import { NodeInstance } from "../interfaces/NodeInstance";
import { EdgeInstance } from "../interfaces/EdgeInstance";
import { AgentInstance } from "../interfaces/AgentInstance";
import { AgentClass } from "../types/agent-class.type";
import { MapAssetInstance } from "../interfaces/MapAssetInstance";
import { ExecutionLog } from "../types/execution-log.type";
import registerCreatingHook from "./registerCreatingHook";
import "./syncProtocol";
import "./enableSync";
import { enableSync } from "./enableSync";
class MyAppDatabase extends Dexie {
  projects: Dexie.Table<Project, number>;
  scenes: Dexie.Table<Scene, number>;
  stories: Dexie.Table<Story, number>;
  nodes: Dexie.Table<NodeInstance, number>;
  edges: Dexie.Table<EdgeInstance, number>;
  agents: Dexie.Table<AgentInstance, number>;
  agentClasses: Dexie.Table<AgentClass, number>;
  mapAssets: Dexie.Table<MapAssetInstance, number>;
  executionLogs: Dexie.Table<ExecutionLog, number>;

  constructor() {
    super("HCDatabase");
    this.version(1).stores({
      projects: "id,name",
      scenes: "id, name, lastUpdate, createdAt, projectId",
      mapAssets: "id, sceneId, createdAt, data",
      stories: "id, name, lastUpdate, createdAt, projectId",
      nodes: "id, type, x, y, label, storyId, createdAt",
      edges: "id, sourceNodeId, targetNodeId, sourceHandle, targetHandle",
      agents: "id, agentSpriteId, agentClassId, storyId",
      agentClasses: "id, name, schema, projectId",
      executionLogs: "id,executionId,nodeId,nodeType,inputData,outputData,status,createdAt,storyId",
    });
    this.projects = this.table("projects");
    this.scenes = this.table("scenes");
    this.stories = this.table("stories");
    this.nodes = this.table("nodes");
    this.edges = this.table("edges");
    this.agents = this.table("agents");
    this.agentClasses = this.table("agentClasses");
    this.mapAssets = this.table("mapAssets");
    this.executionLogs = this.table("executionLogs");

    registerCreatingHook(this.projects);
    registerCreatingHook(this.scenes);
    registerCreatingHook(this.stories);
    registerCreatingHook(this.nodes);
    registerCreatingHook(this.edges);
    registerCreatingHook(this.agents);
    registerCreatingHook(this.agentClasses);
    registerCreatingHook(this.mapAssets);
    registerCreatingHook(this.executionLogs);
  }
}

const db = new MyAppDatabase();
enableSync(db, import.meta.env.VITE_SYNC_ENABLED === "true");

export default db;
