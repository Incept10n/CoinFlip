import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQDitjh3raz8UW0FXhdarE4DGVoSrTDX5X8uDr_0AR0S-CMe");

    const main = provider.open(Main.createFromAddress(address));

    await main.sendDeposit(
        provider.sender(),
        toNano(0.05),
    )

    
    ui.write('Balance deposited successfully!');
}

