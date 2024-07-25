import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Ten } from '../wrappers/Ten';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Ten', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Ten');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ten: SandboxContract<Ten>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ten = blockchain.openContract(Ten.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ten.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ten.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ten are ready to use
    });
});
