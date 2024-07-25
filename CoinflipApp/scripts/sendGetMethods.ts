import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse("EQD5zd4z8WaUZyEDhj3O870kXrbHSmEpnqKi8LWhdV_WPt8R");

    const main = provider.open(Main.createFromAddress(address));

    const balance = await main.getBalance();
    const resentWinner = await main.getResentWinner();
    const counter = await main.getCounter();

    ui.write('The getter method successfully triggered');
    ui.write(`The balance is ${balance / 1000000000}`)

    ui.write('The getter method successfully triggered');
    ui.write(`The resent winner is ${resentWinner}`);

    ui.write('The getter method successfully triggered');
    ui.write(`The resent winner is ${counter}`);

    
}

