import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Five } from '../wrappers/Five';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Five', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Five');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let five: SandboxContract<Five>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        five = blockchain.openContract(Five.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await five.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: five.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and five are ready to use
    });
});
