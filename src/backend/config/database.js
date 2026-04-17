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

    // Create table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Check if author column exists, if not add it
    try {
        const result = await db.all("PRAGMA table_info(posts)");
        const hasAuthor = result.some(col => col.name === 'author');
        
        if (!hasAuthor) {
            console.log('⚠️ Migrating database: Adding author column...');
            await db.exec(`
                ALTER TABLE posts ADD COLUMN author TEXT NOT NULL DEFAULT 'Anónimo'
            `);
            console.log('✅ Database migration completed');
        }
    } catch (error) {
        console.warn('⚠️ Could not check author column:', error.message);
    }

    return db;
}
