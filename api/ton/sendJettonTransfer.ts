import { TonClient, WalletContractV4, internal, JettonMaster } from '@ton/ton'
import { mnemonicToPrivateKey } from '@ton/crypto'
import { Address } from '@ton/core'
import { buildJettonTransferBody } from './buildJettonTransferBody'

const client = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    apiKey: process.env.TONCENTER_API_KEY,
    timeout: 30000
})

export async function sendJettonTransfer(
    toUserTonAddress: string,
    jettonAmount: bigint
) {
    const mnemonic = process.env.HOT_WALLET_MNEMONIC
    const jettonMasterAddr = process.env.JETTON_MINTER

    if (!mnemonic) throw new Error('HOT_WALLET_MNEMONIC not set')
    if (!jettonMasterAddr) throw new Error('JETTON_MASTER not set')

    const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '))

    const wallet = WalletContractV4.create({
        publicKey: keyPair.publicKey,
        workchain: 0
    })

    const walletContract = client.open(wallet)

    const jettonMaster = client.open(
        JettonMaster.create(Address.parse(jettonMasterAddr))
    )

    const userJettonWallet = await jettonMaster.getWalletAddress(
        Address.parse(toUserTonAddress)
    )

    const myJettonWallet = await jettonMaster.getWalletAddress(wallet.address)

    const { stack } = await client.runMethod(wallet.address, 'seqno')
    const seqno = stack.readNumber()

    const body = buildJettonTransferBody({
        jettonAmount,
        toAddress: userJettonWallet,
        responseAddress: wallet.address
    })

    await walletContract.sendTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        messages: [
            internal({
                to: myJettonWallet,
                value: '0.1', // gas
                body
            })
        ]
    })
}
