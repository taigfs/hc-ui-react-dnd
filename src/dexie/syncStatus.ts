import Dexie from "dexie";

const syncEnabled = false;
if (syncEnabled) {
  Dexie.syncable
    .connect("sample_protocol", `${import.meta.env.VITE_BACKEND_URL}/sync`)
    .then(() => {
      console.log("Connected to sync server!");
    })
    .catch((err) => {
      console.error("Could not connect to sync server: " + err);
    });
}

Dexie.syncable.getStatus(import.meta.env.VITE_BACKEND_URL).then((status) => {
  //   console.log(`Synchronization status is ${status}`);
});

Dexie.syncable.on("statusChanged", (newStatus, url) => {
  //   console.log(`Synchronization status changed to ${newStatus} for ${url}`);
});
