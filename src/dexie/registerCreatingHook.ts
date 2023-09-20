import { uuidv4 } from "../utils/uuidv4";
import Dexie from "dexie";

// Function to register the creating hook on a table
function registerCreatingHook(table: Dexie.Table<any, any>) {
  table.hook("creating", (primKey, obj, trans) => {
    if (!(obj as any).id) {
      return uuidv4();
    }
  });
}

export default registerCreatingHook;
