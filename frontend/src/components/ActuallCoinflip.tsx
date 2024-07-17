import { useState } from "react";
import SendTransactionButton from "./actuallCoinflipComponents/SendTransactionButton";
import TonAmountForm from "./actuallCoinflipComponents/TonAmountForm";

const ActuallCoinflip = ({ pressedPlay }: { pressedPlay: boolean }) => {
    const [tonAmount, setTonAmount] = useState<string>("");

    // TODO: validation of coins (they have to be valid float string)
    // TODO: the check should be in the SendTransactionButton.tsx before sending
    // TODO: maybe to write the message under the input that validation has failed

    // TODO: call smart contract getter funciton
    // TODO:            to recieve winner and loser and display message accordingly

    return (
        <div
            className={`${!pressedPlay ? "hidden" : ""} fixed left-[30%] w-[70%] h-full`}
        >
            {pressedPlay ? (
                <>
                    <TonAmountForm
                        tonAmount={tonAmount}
                        setTonAmount={setTonAmount}
                    />
                    <SendTransactionButton amoundToSend={tonAmount} />
                </>
            ) : (
                <div />
            )}
        </div>
    );
};

export default ActuallCoinflip;
