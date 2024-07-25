import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TenConfig = {};

export function tenConfigToCell(config: TenConfig): Cell {
    return beginCell().endCell();
}

export class Ten implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Ten(address);
    }

    static createFromConfig(config: TenConfig, code: Cell, workchain = 0) {
        const data = tenConfigToCell(config);
        const init = { code, data };
        return new Ten(contractAddress(workchain, init), init);
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
