import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { ZeroFive } from '../wrappers/ZeroFive';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('ZeroFive', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ZeroFive');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let zeroFive: SandboxContract<ZeroFive>;
    let ownerWallet : SandboxContract<TreasuryContract>;
    let randomWinnerWallet : SandboxContract<TreasuryContract>;
    let randomWallet: SandboxContract<TreasuryContract>

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownerWallet = await blockchain.treasury("owner");
        randomWinnerWallet = await blockchain.treasury("randomWinner");

        zeroFive = blockchain.openContract(ZeroFive.createFromConfig({
            ownerAddress : ownerWallet.address,
            recentWinner : randomWinnerWallet.address,
            counter : 0,
            SumCoins : 0,
        }, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await zeroFive.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: zeroFive.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and zeroFive are ready to use
    });

    it('should not allow the game besides 0.5 TON', async () => {

        randomWallet = await blockchain.treasury("random");

        const sendCoinflipResult = await zeroFive.sendCoinflip(
            randomWallet.getSender(),
            toNano(2),
        );

        expect(sendCoinflipResult.transactions).toHaveTransaction({
            from: randomWallet.address,
            to: zeroFive.address,
            success: false,
            exitCode: 150,
        });
    });

    it('should allow the game on 0.5 TON', async () => {

        randomWallet = await blockchain.treasury("random");

        const sendCoinflipResult = await zeroFive.sendCoinflip(
            randomWallet.getSender(),
            toNano(0.5),
        );

        expect(sendCoinflipResult.transactions).toHaveTransaction({
            from: randomWallet.address,
            to: zeroFive.address,
            success: true,
        });
    });



});
