import { beginCell, Cell, toNano } from "ton-core";

export const getWithdrawInfo = (
    amountTon: number,
): { amountNanoTon: bigint; cell: Cell } => {
    return {
        amountNanoTon: toNano(amountTon + 0.5),
        cell: beginCell().storeUint(2, 32).storeCoins(toNano(0.3)).endCell(),
    };
};
