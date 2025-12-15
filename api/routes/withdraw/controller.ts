import { Request, Response } from 'express'
import { withdrawInternalTokens } from '../../services/withdraw.service'
import { sendJettonTransfer } from '../../ton/sendJettonTransfer'
import { randomUUID } from 'crypto'

export async function withdrawController(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const user = (req as any).user
        const { internalAmount } = req.body

        if (!user || typeof internalAmount !== 'number' || internalAmount < 1000) {
            return res.status(400).json({ error: 'Invalid request data' })
        }

        if (!user.raw_address) {
            return res.status(400).json({ error: 'User has no TON address' })
        }

        const requestId = randomUUID()

        // 1️⃣ сначала списываем и фиксируем заявку
        await withdrawInternalTokens(user.id, internalAmount, requestId)

        const jettonAmount =
            BigInt(Math.floor(internalAmount / 1000)) * 10n ** 9n

        // 2️⃣ потом отправляем on-chain
        await sendJettonTransfer(user.raw_address, jettonAmount)

        return res.json({ success: true })
    } catch (e: any) {
        console.error('Withdraw error:', e)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
