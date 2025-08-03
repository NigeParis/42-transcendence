// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.ts                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: maiboyer <maiboyer@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/07/28 17:36:22 by maiboyer          #+#    #+#             //
//   Updated: 2025/08/03 13:36:25 by maiboyer         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import sqlite from 'better-sqlite3'

import initSql from "./init.sql?raw"
import { newUUIDv7, UUIDv7 } from '@shared/uuid'


export class DBUserExists extends Error {
	public readonly type = 'db-user-exists';
}

// Only way to use the database. Everything must be done through this.
// Prefer to use prepared statement `using this.db.prepare`
export class Database {
	private db: sqlite.Database;
	private st: Map<string, sqlite.Statement> = new Map();

	/**
	 * Create a new instance of the database, and init it to a known state
	 * the file ./init.sql will be ran onto the database, creating any table that might be missing
	 */
	constructor(db_path: string) {
		this.db = sqlite(db_path, {});
		this.db.pragma('journal_mode = WAL');
		this.db.transaction(() => this.db.exec(initSql))();
	}

	/**
	 * close the database
	 */
	destroy(): void {
		// remove any statement from the cache
		this.st.clear();
		// close the database
		this.db?.close();
	}

	/**
	 * use this to create queries. This will create statements (kinda expensive) and cache them
	 * since they will be cached, this means that they are only created once,
	 * otherwise they'll be just spat out from the cache
	 * the statements are cached by the {query} argument, 
	 * meaning that if you try to make two identiqual statement, but with different {query} they won't be cached
	 *
	 * @example this.prepare('SELECT * FROM users WHERE id = ?')
	 * @example this.prepare('SELECT * FROM users LIMIT 100 OFFSET ?')
	 */
	private prepare(query: string): sqlite.Statement {
		let st = this.st.get(query);
		if (st !== undefined) return st;

		st = this.db.prepare(query);
		this.st.set(query, st);
		return st;
	}
}

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
	export interface FastifyInstance {
		db: Database;
	}
}

export type DatabaseOption = {
	path: string;
};

export const uDatabase = fp<DatabaseOption>(async function(
	_fastify: FastifyInstance,
	_options: DatabaseOption) {
	console.log("Database has been hooked up to fastify ?!");
});

export default uDatabase;

