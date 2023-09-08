// database.ts
import Dexie from 'dexie';
import { Project } from '../interfaces/Project';
import { uuidv4 } from '../utils/uuidv4';
// import 'dexie-syncable';

class MyAppDatabase extends Dexie {
    projects: Dexie.Table<Project, number>;

    constructor() {
        super('MyAppDatabase4');
        this.version(1).stores({
            projects: '$$oid,name'
        });
        this.projects = this.table('projects');

        // Intercepte chamadas de 'add' e gere um UUID se $$oid não for fornecido
        this.projects.hook('creating', (primKey, obj, trans) => {
            if (!obj.$$oid) {
                return uuidv4();
            }
        });
    }
}

const db = new MyAppDatabase();

// Configuração de sincronização
// db.syncable.connect('http', import.meta.env.VITE_BACKEND_URL);
// db.syncable.on('statusChanged', (newStatus, url) => {
//     console.log(`Synchronization status changed to ${newStatus} for ${url}`);
// });
export default db;
