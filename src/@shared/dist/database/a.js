import fp from 'fastify-plugin';
import sqlite from 'better-sqlite3';
import { Result } from 'typescript-result';
import initSql from "./init.sql.js";
import { newUUIDv7 } from '@shared/uuid';
export class DBUserExists extends Error {
    type = 'db-user-exists';
}
export class Database {
    db;
    st = new Map();
    constructor(db_path) {
        this.db = sqlite(db_path, {});
        this.db.pragma('journal_mode = WAL');
        this.db.transaction(() => this.db.exec(initSql))();
    }
    destroy() {
        this.st.clear();
        this.db?.close();
    }
    prepare(query) {
        let st = this.st.get(query);
        if (st !== undefined)
            return st;
        st = this.db.prepare(query);
        this.st.set(query, st);
        return st;
    }
    createUser(user) {
        const st = this.prepare('INSERT INTO users VALUES (?, ?) RETURNING id');
        try {
            st.get(newUUIDv7(), user);
        }
        catch (e) {
            console.log(e);
            console.log(typeof e);
        }
        return Result.ok(newUUIDv7());
    }
}
export const uDatabase = fp(async function (_fastify, _options) {
});
export default uDatabase;
