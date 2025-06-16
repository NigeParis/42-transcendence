import { Result } from 'typescript-result';
import { UUIDv7 } from '@shared/uuid';
export declare class DBUserExists extends Error {
    readonly type = "db-user-exists";
}
export declare class Database {
    private db;
    private st;
    constructor(db_path: string);
    destroy(): void;
    private prepare;
    createUser(user: string): Result<UUIDv7, DBUserExists>;
}
declare module 'fastify' {
    interface FastifyInstance {
        db: Database;
    }
}
export type DatabaseOption = {
    path: string;
};
export declare const uDatabase: import("fastify").FastifyPluginCallback<DatabaseOption, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export default uDatabase;
