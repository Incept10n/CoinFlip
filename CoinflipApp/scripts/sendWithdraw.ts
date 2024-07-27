import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQDPBbnQZZQTxfA3Gi69tEfkG48BQHzEUEeaDUKrhTh_Z0u8");

    const main = provider.open(Main.createFromAddress(address));

    await main.sendWithDraw(
        provider.sender(),
        toNano(0.05),
        toNano(0.14)
    )

    
    ui.write('Balance withdrawn successfully!');
}

