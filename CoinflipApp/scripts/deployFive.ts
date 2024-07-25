import { Five } from '../wrappers/Five';
import { Address, toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const five = provider.open(Five.createFromConfig({
        ownerAddress : Address.parse("0QBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSKIj"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('Five')));

    await five.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(five.address);

    // run methods on `five`
}
