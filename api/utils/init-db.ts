// utils/initDb.ts

import { pool } from "../config/db";

export async function initDb(): Promise<void> {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,    
        description TEXT,
        cost INTEGER DEFAULT 0 NOT NULL, 
        is_free BOOLEAN DEFAULT FALSE,  
        course_status VARCHAR(50) DEFAULT 'available', 
        created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS lessons (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            lesson_cost INTEGER DEFAULT 500 NOT NULL, 
            image_urls TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[], 
            test_questions JSONB NOT NULL DEFAULT '[]'::JSONB, 
            max_points INTEGER DEFAULT 3000 NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS user_courses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
            current_lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL, 
            status VARCHAR(50) NOT NULL DEFAULT 'started',
            earned_points INTEGER DEFAULT 0, 
            completed_lessons_count INTEGER DEFAULT 0,
            
            -- УНИКАЛЬНОСТЬ: ОДИН ЮЗЕР - ОДИН КУРС!
            UNIQUE (user_id, course_id), 
            created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    await pool.query(`
        DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(120),
            raw_address TEXT UNIQUE NOT NULL,
            ton_public_key TEXT,
            tokens INTEGER DEFAULT 0, 
            role VARCHAR(20) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `);
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS friendships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        friend_id UUID REFERENCES users(id) ON DELETE CASCADE
        );
    `);
}