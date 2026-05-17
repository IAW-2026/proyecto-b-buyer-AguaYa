export async function getClaimsByOrderId(orderIds: string): Promise<Claim[]> {
    return [{ claim_id: 0 }];
}

export type Claim = {
    claim_id : number
}