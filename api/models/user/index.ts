import { pool } from "../../config/db";
import { User } from "../../types/user";

export async function getUserById(id: string): Promise<User | null> {
  const query = `SELECT * FROM users WHERE id = $1 LIMIT 1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

export async function getUserByRawAddress(rawAddress: string): Promise<User | null> {
  const query = `SELECT * FROM users WHERE raw_address = $1 LIMIT 1`;
  const { rows } = await pool.query(query, [rawAddress]);
  return rows[0] || null;
}

interface CreateUserOptions {
  name?: string | null;
  tokens?: number;
  course_id?: string | null;
}

export async function createUserWithRawAddress(
  rawAddress: string,
  options: CreateUserOptions = {}
): Promise<User> {
  const { name = null, tokens = 0, course_id = null } = options;

  const query = `
    INSERT INTO users (raw_address, name, tokens, course_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [rawAddress, name, tokens, course_id]);
  return rows[0];
}

// Update only initial fields on first login (for safety)
export async function updateUserOnFirstLogin(
  id: string,
  options: { name?: string | null }
): Promise<User> {
  const { name = null } = options;

  const query = `
    UPDATE users
    SET
      name = COALESCE($2, name),
      updated_at = NOW()
    WHERE id = $1
      AND (name IS NULL OR name = '')
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [id, name]);
  return rows[0];
}

export async function updateTokens(id: string, amount: number): Promise<User | null> {
    const query = `
        UPDATE users
        SET
            tokens = tokens + $2,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, amount]);
    return rows[0] || null;
}

export async function spendTokens(id: string, amount: number): Promise<User> {
    const query = `
        UPDATE users
        SET
            tokens = tokens - $2,
            updated_at = NOW()
        WHERE id = $1
          AND tokens >= $2 
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [id, amount]); 
    
    if (rows.length === 0) {
        const userCheck = await getUserById(id);
        if (userCheck && userCheck.tokens < amount) {
             throw new Error("Insufficient tokens.");
        }
        throw new Error("User not found or tokens insufficient.");
    }
    
    return rows[0];
}