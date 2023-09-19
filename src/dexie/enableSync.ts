import Dexie from "dexie";
import "dexie-syncable";

export function enableSync(db: Dexie, syncEnabled: boolean) {
  if (!syncEnabled) {
    console.log("Sync is disabled. Skipping...");
    return;
  }

  db.syncable
    .connect("sample_protocol", `${import.meta.env.VITE_BACKEND_URL}/sync`)
    .then(() => {
      console.log("Connected to sync server!");
    })
    .catch((err) => {
      console.error("Could not connect to sync server: " + err);
    });

  db.syncable.on("statusChanged", (newStatus, url) => {
    // console.log(`Synchronization status changed to ${newStatus} for ${url}`);
  });

  db.syncable.getStatus(import.meta.env.VITE_BACKEND_URL).then((status) => {
    // console.log(`Synchronization status is ${status}`);
  });
}