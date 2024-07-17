import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQCu63WhIcbnkmizgjre-XtT1nsMAHt8FDVAbXWvor8cBjmp");

    const main = provider.open(Main.createFromAddress(address));

    await main.sendCoinflip(
        provider.sender(),
        toNano('0.5'),
    )

    ui.write('Balance withdrawn successfully!');
}


// This script is not ready !!!!!
