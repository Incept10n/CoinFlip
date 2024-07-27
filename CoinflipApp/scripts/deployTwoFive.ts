import { TwoFive } from '../wrappers/TwoFive';
import { Address, toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';

export async function run(provider: NetworkProvider) {
    const twoFive = provider.open(TwoFive.createFromConfig({
        ownerAddress : Address.parse("EQBIrwlqlzbePQy__jZKdtaCbSAVCUwKUepyh45I9XXJSERs"),
        recentWinner : randomAddress(),
        counter : 0,
        SumCoins : 0,
    }, await compile('TwoFive')));

    await twoFive.sendDeploy(provider.sender(), toNano('0.05'));

    console.log(twoFive.address)

    await provider.waitForDeploy(twoFive.address);

    // run methods on `twoFive`
}
