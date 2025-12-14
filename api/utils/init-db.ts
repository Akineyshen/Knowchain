import { pool } from "../config/db";

export async function initDb(): Promise<void> {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

        await pool.query(`
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
        UNIQUE (user_id, course_id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS friendships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        friend_id UUID REFERENCES users(id) ON DELETE CASCADE
      );
    `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS withdrawals (
                id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                internal_amount INTEGER NOT NULL,
                tx_hash TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT now()
                );
        `);


        console.log("initDb: all tables created (or already existed)");
    } catch (err) {
        console.error("initDb error:", err);
        throw err;
    }
}
