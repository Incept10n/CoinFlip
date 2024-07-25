import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { One } from '../wrappers/One';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('One', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('One');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let one: SandboxContract<One>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        one = blockchain.openContract(One.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await one.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: one.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and one are ready to use
    });
});
