import { beginCell, Address } from '@ton/core'

const OP_TRANSFER = 0xf8a7ea5 // jetton transfer

export function buildJettonTransferBody(params: {
    jettonAmount: bigint
    toAddress: Address
    responseAddress: Address
}) {
    return beginCell()
        .storeUint(OP_TRANSFER, 32)          // op
        .storeUint(0, 64)                    // query_id
        .storeCoins(params.jettonAmount)     // amount
        .storeAddress(params.toAddress)      // destination
        .storeAddress(params.responseAddress)// response_destination
        .storeBit(0)                         // no custom payload
        .storeCoins(0)                       // forward TON
        .storeBit(0)                         // no forward payload
        .endCell()
}
