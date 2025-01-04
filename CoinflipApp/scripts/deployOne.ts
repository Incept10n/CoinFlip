import { Address, toNano } from '@ton/core';
import { One } from '../wrappers/One';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const one = provider.open(One.createFromConfig({
        ownerAddress : Address.parse("EQBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSERs"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('One')));

    await one.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(one.address);

    // run methods on `one`
}
