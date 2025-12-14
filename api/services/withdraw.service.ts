import { pool } from '../config/db'

const COURSE = 1000

export async function withdrawInternalTokens(
    userId: string,
    internalAmount: number,
    txHash: string
) {
    if (internalAmount < COURSE) {
        throw new Error('Minimum withdraw is 1000')
    }

    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        const { rows } = await client.query(
            'SELECT tokens FROM users WHERE id = $1 FOR UPDATE',
            [userId]
        )

        const balance = rows[0]?.tokens ?? 0

        if (balance < internalAmount) {
            throw new Error('Not enough tokens')
        }

        await client.query(
            'UPDATE users SET tokens = tokens - $1 WHERE id = $2',
            [internalAmount, userId]
        )

        await client.query(
            `
      INSERT INTO withdrawals (user_id, internal_amount, tx_hash)
      VALUES ($1, $2, $3)
      `,
            [userId, internalAmount, txHash]
        )

        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}