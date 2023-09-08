// database.ts
import Dexie from 'dexie';
import { Project } from '../interfaces/Project';
// import 'dexie-syncable';

class MyAppDatabase extends Dexie {
    projects: Dexie.Table<Project, number>;

    constructor() {
        super('MyAppDatabase4');
        this.version(1).stores({
            projects: '$$oid,name'
        });
        this.projects = this.table('projects');
    }
}

const db = new MyAppDatabase();

// Configuração de sincronização
// db.syncable.connect('http', import.meta.env.VITE_BACKEND_URL);
// db.syncable.on('statusChanged', (newStatus, url) => {
//     console.log(`Synchronization status changed to ${newStatus} for ${url}`);
// });
export default db;
