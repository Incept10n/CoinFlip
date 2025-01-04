import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type ZeroFiveConfig = {
    ownerAddress : Address,
    recentWinner : Address,
    counter : number,
    SumCoins : number
};

export function zeroFiveConfigToCell(config: ZeroFiveConfig): Cell {
    return beginCell()
            .storeAddress(config.ownerAddress)
            .storeAddress(config.recentWinner)
            .storeUint(config.counter, 32)
            .storeUint(config.SumCoins, 32)
    .endCell();
}

export class ZeroFive implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ZeroFive(address);
    }

    static createFromConfig(config: ZeroFiveConfig, code: Cell, workchain = 0) {
        const data = zeroFiveConfigToCell(config);
        const init = { code, data };
        return new ZeroFive(contractAddress(workchain, init), init);
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

    async sendCoinflip (
        provider: ContractProvider,
        via: Sender,
        value: bigint
    ) {
        await provider.internal(via, 
            {
                value,
                body: beginCell()
                        .storeUint(2, 32)
                        .storeCoins(value)
                        .endCell()
            }
        )
    }


}
