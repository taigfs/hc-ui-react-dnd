import Dexie from "dexie";
import { Project } from "../interfaces/Project";
import { uuidv4 } from "../utils/uuidv4";
import "dexie-syncable";
import axiosInstance from "../services/api";
import { IRequest } from "./request.interface";
import { IResponseData } from "./response-data.interface";
import { Scene } from "../interfaces/Scene";
import { Story } from "../interfaces/Story";
import { NodeInstance } from "../interfaces/NodeInstance";
import { EdgeInstance } from "../interfaces/EdgeInstance";
import { AgentInstance } from "../interfaces/AgentInstance";
import { AgentClass } from "../types/agent-class.type";
import { MapAssetInstance } from "../interfaces/MapAssetInstance";

class MyAppDatabase extends Dexie {
  projects: Dexie.Table<Project, number>;
  scenes: Dexie.Table<Scene, number>;
  stories: Dexie.Table<Story, number>;
  nodes: Dexie.Table<NodeInstance, number>;
  edges: Dexie.Table<EdgeInstance, number>;
  agents: Dexie.Table<AgentInstance, number>;
  agentClasses: Dexie.Table<AgentClass, number>;
  mapAssets: Dexie.Table<MapAssetInstance, number>;

  constructor() {
    super("MyAppDatabase6");
    this.version(1).stores({
      projects: "$$oid,name",
      scenes: "$$oid, name, lastUpdate, createdAt, projectId",
      mapAssets: "$$oid, sceneId, createdAt, mapAssetSpriteId",
      stories: "$$oid, name, lastUpdate, createdAt, projectId",
      nodes: "$$oid, type, x, y, label, storyId, createdAt",
      edges: "$$oid, sourceNodeId, targetNodeId, sourceHandle, targetHandle",
      agents: "$$oid, agentSpriteId, agentClassId, storyId",
      agentClasses: "$$oid, name, schema, projectId",
    });
    this.projects = this.table("projects");
    this.scenes = this.table("scenes");
    this.stories = this.table("stories");
    this.nodes = this.table("nodes");
    this.edges = this.table("edges");
    this.agents = this.table("agents");
    this.agentClasses = this.table("agentClasses");
    this.mapAssets = this.table("mapAssets");

    // Intercepte chamadas de 'add' e gere um UUID se $$oid não for fornecido
    this.projects.hook("creating", (primKey, obj, trans) => {
      if ((!obj as any).$$oid) {
        return uuidv4();
      }
    });
  }
}

const db = new MyAppDatabase();

Dexie.Syncable.registerSyncProtocol("sample_protocol", {
  sync: function (
    context: any,
    url: string,
    options: any,
    baseRevision: number,
    syncedRevision: number,
    changes: any[],
    partial: boolean,
    applyRemoteChanges: Function,
    onChangesAccepted: Function,
    onSuccess: Function,
    onError: Function
  ) {
    const POLL_INTERVAL = 10000; // Poll every 10th second

    console.log(context);
    const request: IRequest = {
      clientIdentity: context.clientIdentity || null,
      baseRevision: baseRevision,
      partial: partial,
      changes: changes,
      syncedRevision: syncedRevision,
    };

    axiosInstance
      .post<IResponseData>(url, request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          onError(data.errorMessage, Infinity);
        } else {
          if (data.clientIdentity) {
            context.clientIdentity = data.clientIdentity;
            context
              .save()
              .then(() => {
                onChangesAccepted();
                applyRemoteChanges(
                  data.changes!,
                  data.currentRevision!,
                  data.partial!,
                  data.needsResync!
                );
                onSuccess({ again: POLL_INTERVAL });
              })
              .catch((e: any) => {
                onError(e.toString(), Infinity);
              });
          } else {
            onChangesAccepted();
            applyRemoteChanges(
              data.changes!,
              data.currentRevision!,
              data.partial!,
              data.needsResync!
            );
            onSuccess({ again: POLL_INTERVAL });
          }
        }
      })
      .catch((error) => {
        onError(error.message, POLL_INTERVAL);
      });
  },
});

db.syncable
  .connect("sample_protocol", `${import.meta.env.VITE_BACKEND_URL}/sync`)
  .then(() => {
    console.log("Connected to sync server!");
  })
  .catch((err) => {
    console.error("Could not connect to sync server: " + err);
  });

db.syncable.getStatus(import.meta.env.VITE_BACKEND_URL).then((status) => {
  //   console.log(`Synchronization status is ${status}`);
});

db.syncable.on("statusChanged", (newStatus, url) => {
  //   console.log(`Synchronization status changed to ${newStatus} for ${url}`);
});

export default db;
