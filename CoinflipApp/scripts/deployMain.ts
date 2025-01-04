import { Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const main = provider.open(Main.createFromConfig({
        ownerAddress : Address.parse("EQBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSERs"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('Main')));

    await main.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(main.address);

    // run methods on `main`
}
