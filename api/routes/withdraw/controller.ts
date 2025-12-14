import { Request, Response } from 'express'
import { withdrawInternalTokens } from '../../services/withdraw.service'
import { sendJettonTransfer } from '../../ton/sendJettonTransfer'

export async function withdrawController(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const user = (req as any).user
        const body = req.body as { internalAmount?: number }

        if (
            !user ||
            typeof body.internalAmount !== 'number' ||
            body.internalAmount < 1000
        ) {
            return res.status(400).json({ error: 'Invalid request data' })
        }

        if (!user.raw_address) {
            return res.status(400).json({ error: 'User has no TON address' })
        }

        const jettonAmount =
            BigInt(Math.floor(body.internalAmount / 1000)) * 10n ** 9n

        // 1️⃣ отправляем KNW пользователю
        await sendJettonTransfer(user.raw_address, jettonAmount)

        // 2️⃣ списываем внутренние токены
        await withdrawInternalTokens(user.id, body.internalAmount, 'transfer')

        return res.json({ success: true })
    } catch (e: any) {
        console.error('Withdraw error:', e)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
