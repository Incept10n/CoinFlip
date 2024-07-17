import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano } from '@ton/core';

export type MainConfig = {
    ownerAddress : Address,
    recentWinner : Address,
    counter : number,
    SumCoins : number
};

export function mainConfigToCell(config: MainConfig): Cell {
    return beginCell()
            .storeAddress(config.ownerAddress)
            .storeAddress(config.recentWinner)
            .storeUint(config.counter, 32)
            .storeUint(config.SumCoins, 32)
    .endCell();
}

export class Main implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Main(address);
    }

    static createFromConfig(config: MainConfig, code: Cell, workchain = 0) {
        const data = mainConfigToCell(config);
        const init = { code, data };
        return new Main(contractAddress(workchain, init), init);
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

    async sendDeposit(
        provider: ContractProvider,
        via: Sender,
        value: bigint
    ) {
        await provider.internal(
            via, 
            {
                value,
                body: beginCell()
                        .storeUint(1, 32)
                        .endCell()
            }
        )
    }

    async getBalance (provider: ContractProvider) {
        const { stack } = await provider.get("getBalance", []);
        return stack.readNumber();
    }

    async sendLogicOpcode (
        provider: ContractProvider, 
        via: Sender,
        value: bigint
    ) {
        await provider.internal(
            via,
            {
                value,
                body: beginCell()
                        .storeUint(3, 32)
                        .endCell()
            }
        )
    }

    async sendWorngOpcode (
        provider: ContractProvider, 
        via: Sender,
        value: bigint
    ) {
        await provider.internal(
            via,
            {
                value,
                body: beginCell()
                        .storeUint(123, 32)
                        .endCell()
            }
        )
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

    async getResentWinner (provider: ContractProvider) {
        const { stack } = await provider.get("getResentWinner", []);
        return stack.readAddress();
    }

    async sendWithDraw (
        provider : ContractProvider,
        via : Sender,
        value: bigint,
        amounToWIthdraw: bigint,
    ) {
        await provider.internal(via, {
            value,
            body: beginCell()
                    .storeUint(4, 32)
                    .storeCoins(amounToWIthdraw)
                    .endCell()
        });
    }



}
