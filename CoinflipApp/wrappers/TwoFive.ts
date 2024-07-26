import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TwoFiveConfig = {};

export function twoFiveConfigToCell(config: TwoFiveConfig): Cell {
    return beginCell().endCell();
}

export class TwoFive implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TwoFive(address);
    }

    static createFromConfig(config: TwoFiveConfig, code: Cell, workchain = 0) {
        const data = twoFiveConfigToCell(config);
        const init = { code, data };
        return new TwoFive(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(1, 32)
                    .storeAddress(Address.parse("EQDVtU59b2CTUj80GYVv64XWYeJjRYsFjKBLRyfi-q73Li3N"))
                    .storeAddress(Address.parse("EQDVtU59b2CTUj80GYVv64XWYeJjRYsFjKBLRyfi-q73Li3N"))
                    .storeUint(0, 32)
                    .storeUint(0, 32)
            .endCell(),
        });
    }
}
