import { Address, beginCell, toNano, TonClient } from "ton";
import { TON_CENTER_API_KEY, tonCenterUrl } from "./constants";
import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui-react";

export async function fireGetterMethod(address: string) {
    const client = new TonClient({
        endpoint: tonCenterUrl,
        apiKey: TON_CENTER_API_KEY,
    });

    const result = await client.runMethod(
        Address.parse(address),
        "getStateOfGame",
    );

    return result.stack.readNumber();
}

export const sendTransactionToSmartContract = async (
    amountToSend: number,
    address: string,
    tonConnectUI: TonConnectUI,
) => {
    const body = beginCell()
        .storeUint(2, 32)
        .storeCoins(toNano(amountToSend))
        .endCell();

    const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: Address.parse(address).toString(),
                amount: toNano(amountToSend).toString(),
                payload: body.toBoc().toString("base64"),
            },
        ],
    };

    return tonConnectUI.sendTransaction(transaction);
};
