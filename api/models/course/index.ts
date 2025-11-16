import { pool } from "../../config/db";

export async function getCourseById(id: string) {
  const query = `SELECT * FROM courses WHERE id = $1 LIMIT 1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}
