import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, Cell, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';
import { randomAddress } from '@ton/test-utils';
import { availableMemory } from 'process';

describe('Main', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Main');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let main: SandboxContract<Main>;
    let ownerWallet : SandboxContract<TreasuryContract>;
    let randomWinnerWallet : SandboxContract<TreasuryContract>;
    let randomWallet : SandboxContract<TreasuryContract>;
    let buffWallet : SandboxContract<TreasuryContract>;
    let player1Wallet : SandboxContract<TreasuryContract>;
    let player2Wallet : SandboxContract<TreasuryContract>;


    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownerWallet = await blockchain.treasury("owner");
        randomWinnerWallet = await blockchain.treasury("randomWinner");

        main = blockchain.openContract(Main.createFromConfig({
            ownerAddress : ownerWallet.address,
            recentWinner : randomWinnerWallet.address,
            counter : 0,
            SumCoins : 0,
        }, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await main.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: main.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and main are ready to use
    });

    it('should accept deposit', async () => {

        randomWallet = await blockchain.treasury("randomAddr1");

        let balance1 = await main.getBalance();

        const depositResult = await main.sendDeposit(
            randomWallet.getSender(),
            toNano(2),
        );

        let balance2 = await main.getBalance();

        expect(depositResult.transactions).toHaveTransaction({
            from: randomWallet.address,
            to: main.address,
            success: true,
        })
        
        expect(balance2).toBeGreaterThan(balance1);
    });

    it('should not allow to send message to the coinflip logic opcode', async () => {

        buffWallet = await blockchain.treasury("buff"); 

        const sendLogicOpcodeResult = await main.sendLogicOpcode(
            buffWallet.getSender(),
            toNano(0.05)
        );

        expect(sendLogicOpcodeResult.transactions).toHaveTransaction({
            from: buffWallet.address,
            to: main.address,
            success: false,
            exitCode: 333
        })
    });

    it('should throw 222 to unknown opcode', async () => {

        randomWallet = await blockchain.treasury("random");

        const sendWorngOpResult = await main.sendWorngOpcode(
            randomWallet.getSender(),
            toNano(0.5),
        );

        expect(sendWorngOpResult.transactions).toHaveTransaction({
            from: randomWallet.address,
            to: main.address,
            success: false,
            exitCode: 111,
        });
    });

    it('should do the coinflip staff', async () => {

        // console.log("Contract balance before:")
        // console.log(await main.getBalance())

        player1Wallet = await blockchain.treasury("player1");
        player2Wallet = await blockchain.treasury("player2");
        // const balance1Before = await player1Wallet.getBalance()
        // const balance2Before = await player2Wallet.getBalance()

        const sendPlayer1Deposit = await main.sendCoinflip(
            player1Wallet.getSender(),
            toNano(5),
        );

        let recentWinnerBefore = await main.getResentWinner();

        expect(sendPlayer1Deposit.transactions).toHaveTransaction({
            from: player1Wallet.address,
            to: main.address,
            success: true,
        })

        let recentWinnerAfter = await main.getResentWinner();

        expect(recentWinnerBefore).toEqualAddress(recentWinnerAfter);

        const sendPlayer2Deposit = await main.sendCoinflip(
            player2Wallet.getSender(),
            toNano(5),
        )

        expect(sendPlayer2Deposit.transactions).toHaveTransaction({
            from: main.address,
            to: main.address,
            success: true,
            exitCode: 0,
        });

        // console.log("Contract balance after:")
        // console.log(await main.getBalance())

        const balance1After = await player1Wallet.getBalance()
        const balance2After = await player2Wallet.getBalance()

        console.log("Balance1 After");
        console.log(balance1After)

        console.log("Balance2 After");
        console.log(balance2After)

        const lastWinner = await main.getResentWinner();
        expect(lastWinner).toEqualAddress(player2Wallet.address);

        
// -------------------------
// second time coinflip

        // const sendPlayer1Deposit_2 = await main.sendCoinflip(
        //     player1Wallet.getSender(),
        //     toNano(5),
        // );

        // expect(sendPlayer1Deposit_2.transactions).toHaveTransaction({
        //     from: player1Wallet.address,
        //     to: main.address,
        //     success: true,
        // })


        // const sendPlayer2Deposit_2 = await main.sendCoinflip(
        //     player2Wallet.getSender(),
        //     toNano(5),
        // )

        // expect(sendPlayer2Deposit_2.transactions).toHaveTransaction({
        //     from: main.address,
        //     to: main.address,
        //     success: true,
        //     exitCode: 0,
        // });

        // const lastWinner_2 = await main.getResentWinner();
        // expect(lastWinner_2).toEqualAddress(player1Wallet.address);






    });

    it('should accept withdraw', async () => {

        const randomWallet = await blockchain.treasury("randomWithdraw");
        const sendDeopsitResult = await main.sendDeposit(
            randomWallet.getSender(),
            toNano("5")
        );

        expect(sendDeopsitResult.transactions).toHaveTransaction({
            from: randomWallet.address,
            to: main.address,
            success: true,
        });

        const mainBalanceBefore = await main.getBalance();

        const sendWithDrawresult = await main.sendWithDraw(
            ownerWallet.getSender(),
            toNano("0.05"),
            toNano("3"),
        )

        const mainBalanceAfter = await main.getBalance();

        expect(sendWithDrawresult.transactions).toHaveTransaction({
            from: ownerWallet.address,
            to: main.address,
            success: true,
        });

        expect(mainBalanceBefore).toBeGreaterThan(mainBalanceAfter);

    });
});
