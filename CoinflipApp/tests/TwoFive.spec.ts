import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TwoFive } from '../wrappers/TwoFive';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TwoFive', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TwoFive');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let twoFive: SandboxContract<TwoFive>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        twoFive = blockchain.openContract(TwoFive.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await twoFive.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: twoFive.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and twoFive are ready to use
    });
});
