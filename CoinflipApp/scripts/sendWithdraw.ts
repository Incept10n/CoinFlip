import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQBCe4vuGyxr6oOatpgQw4qpbQ0T5AbJgDEO3C7eEn1zoDCT");

    const main = provider.open(Main.createFromAddress(address));

    await main.sendWithDraw(
        provider.sender(),
        toNano(0.05),
        toNano(0.15)
    )

    
    ui.write('Balance withdrawn successfully!');
}

