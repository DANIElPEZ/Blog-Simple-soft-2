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
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author_id INTEGER,
            author_name TEXT,
            FOREIGN KEY(author_id) REFERENCES users(id)
        );
    `);
    return db;
}