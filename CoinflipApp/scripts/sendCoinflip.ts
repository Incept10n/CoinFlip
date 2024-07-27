import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("kQDPBbnQZZQTxfA3Gi69tEfkG48BQHzEUEeaDUKrhTh_Z_A2");

    const main = provider.open(Main.createFromAddress(address));

    await main.sendCoinflip(
        provider.sender(),
        toNano(2.5),
    )

    
    ui.write('Coinflipped successfully!');
}

