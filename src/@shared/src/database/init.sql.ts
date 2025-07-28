//! this file was generated automatically.
//! it is just a string literal that is the file ./src/database/init.sql
//! if you want to edit this file, DONT. edit ./src/database/init.sql please
//! 
//! this file need to be regenerated on changes to ./src/database/init.sql manually.
//! the `npm run build:ts` might regenerate it, but do check.
//! here is the date of the last time it was generated: Mon Jul 28 2025 16:40:15 GMT+0200 (Central European Summer Time)
//! the file ./src/database/init.sql that is embeded was modified on Sat Jul 19 2025 15:33:56 GMT+0200 (Central European Summer Time)
//! the file ./src/database/init.sql that is embeded was 436 bytes


export default "-- this file will make sure that the database is always up to date with the correct schema\n-- when editing this file, make sure to always include stuff like `IF NOT EXISTS` such as to not throw error\n-- NEVER DROP ANYTHING IN THIS FILE\nCREATE TABLE IF NOT EXISTS users (\n  id STRING UNIQUE PRIMARY KEY, -- UUIDv7 as a string\n  name STRING UNIQUE, -- name of the user\n  token STRING UNIQUE, -- the token of the user (aka the cookie)\n);\n\n";