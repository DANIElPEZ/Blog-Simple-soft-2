import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connectDB() {
    return open({
        filename: './blog.db',
        driver: sqlite3.Database
    });
}

export async function initDB() {
    const db = await connectDB();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}
