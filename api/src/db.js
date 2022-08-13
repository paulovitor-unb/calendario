import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function dbOpen() {
    return open({
        filename: `./${process.env.DB_NAME}.sqlite3`,
        driver: sqlite3.Database,
    });
}
