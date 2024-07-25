import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FiveConfig = {};

export function fiveConfigToCell(config: FiveConfig): Cell {
    return beginCell().endCell();
}

export class Five implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Five(address);
    }

    static createFromConfig(config: FiveConfig, code: Cell, workchain = 0) {
        const data = fiveConfigToCell(config);
        const init = { code, data };
        return new Five(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                    .storeUint(1, 32)
                    .storeAddress(Address.parse("0QBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSKIj"))
                    .storeAddress(Address.parse("0QBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSKIj"))
                    .storeUint(0, 32)
                    .storeUint(0, 32)
            .endCell(),
        });
    }
}
