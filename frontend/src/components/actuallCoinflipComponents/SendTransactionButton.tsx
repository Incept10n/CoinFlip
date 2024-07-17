import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { Address, beginCell, toNano } from "ton-core";
import { tonSmartContractAddress } from "../../constants";
import { useEffect, useState } from "react";

const SendTransactionButton = ({ amoundToSend }: { amoundToSend: string }) => {
    const [tonConnectUI, setOptions] = useTonConnectUI();

    const body = beginCell()
        .storeUint(2, 32)
        .storeCoins(toNano(amoundToSend))
        .endCell();

    const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: Address.parse(tonSmartContractAddress).toString(),
                amount: toNano(amoundToSend).toString(),
                payload: body.toBoc().toString("base64"),
            },
        ],
    };

    const handleSendCoins = () => {
        tonConnectUI.sendTransaction(transaction);
    };

    const [isDisplayButton, setIsDisplayButton] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setIsDisplayButton(true), 5000);
    }, []);

    return (
        <span
            className={`fixed text-gray-500 text-[2em] hover:cursor-pointer
                    border-[1px] border-gray-500 rounded-[12px] p-[6px]
                    top-[65%] translate-y-[-50%] translate-x-[-50%] 
                    w-[400px] text-center hover:w-[500px] transition-all duration-[0.5s] ease-out
                    hover:text-gray-400 hover:border-gray-400 left-[55%]
                    ${isDisplayButton ? "scale-100" : "scale-0"}`}
            onClick={handleSendCoins}
        >
            Send TON to coinflip
        </span>
    );
};

export default SendTransactionButton;
