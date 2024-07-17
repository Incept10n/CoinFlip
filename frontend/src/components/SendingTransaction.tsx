import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { getWithdrawInfo } from "../functions/basicFunctions";

export const SendingTransaction = () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();

    const withdrawInfo = getWithdrawInfo(2);

    const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: Address.parse(
                    "EQC_qhykAvxnJ50KsXSfRB7bH_VQthAa4xUNYjUAFbsy18pW",
                ).toString(),
                amount: withdrawInfo.amountNanoTon.toString(),
                payload: withdrawInfo.cell.toBoc().toString("base64"),
            },
        ],
    };

    return (
        <div>
            <button
                className="hover:bg-gray-500 p-2 rounded-[10px]"
                onClick={() => tonConnectUI.sendTransaction(transaction)}
            >
                Send transaction
            </button>
        </div>
    );
};
