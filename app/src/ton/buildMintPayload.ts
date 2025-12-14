import { beginCell, Address } from '@ton/core'

export function buildMintPayload(
    recipient: string,
    jettonAmount: bigint
) {
    return beginCell()
        .storeUint(21, 32)                      // mint opcode
        .storeUint(0, 64)                       // query_id
        .storeCoins(jettonAmount)               // amount (nano jettons)
        .storeAddress(Address.parse(recipient)) // to
        .storeAddress(Address.parse(recipient)) // response_address
        .storeBit(0)                            // no custom payload
        .storeCoins(0)                          // forward TON amount
        .storeBit(0)                            // no forward payload
        .endCell()
}
