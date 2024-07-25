import { ZeroFive } from '../wrappers/ZeroFive';
import { Address, toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const zeroFive = provider.open(ZeroFive.createFromConfig({
        ownerAddress : Address.parse("0QBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSKIj"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('ZeroFive')));

    await zeroFive.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(zeroFive.address);

    // run methods on `zeroFive`
}
