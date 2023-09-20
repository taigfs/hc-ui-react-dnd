import Dexie from "dexie";
import axiosInstance from "../services/api";
import { IRequest } from "./request.interface";
import { IResponseData } from "./response-data.interface";

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
