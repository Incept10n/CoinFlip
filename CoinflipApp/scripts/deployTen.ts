import { Ten } from '../wrappers/Ten';
import { Address, toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const ten = provider.open(Ten.createFromConfig({
        ownerAddress : Address.parse("EQBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSERs"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('Ten')));

    await ten.sendDeploy(provider.sender(), toNano('0.05'));

    console.log(ten.address);

    await provider.waitForDeploy(ten.address);

    // run methods on `ten`
}
