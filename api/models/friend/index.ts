import { pool } from "../../config/db";

export async function addFriend(userId: string, friendId: string) {
  const query = `
    INSERT INTO friendships (user_id, friend_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [userId, friendId]);
  return rows[0] || null;
}

export async function getFriends(userId: string) {
  const query = `
    SELECT u.*
    FROM friendships f
    JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = $1;
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}
