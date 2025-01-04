import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("kQDPBbnQZZQTxfA3Gi69tEfkG48BQHzEUEeaDUKrhTh_Z_A2");

    const main = provider.open(Main.createFromAddress(address));

    const balance = await main.getBalance();
    const resentWinner = await main.getResentWinner();
    const counter = await main.getCounter();

    ui.write('The get balance method successfully triggered');
    ui.write(`The balance is ${balance / 1000000000}`)

    ui.write('The get resent winner method successfully triggered');
    ui.write(`The resent winner is ${resentWinner}`);

    ui.write('The get counter method successfully triggered');
    ui.write(`The counter is ${counter}`);

    
}

