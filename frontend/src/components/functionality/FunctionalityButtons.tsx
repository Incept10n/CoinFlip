import { useContext } from "react";
import { ApplicationContext } from "../Application";
import SendTonButton from "./SendTonButton";
import {
    contract_0dot5_TON_address,
    contract_10_TON_address,
    contract_1_TON_address,
    contract_2dot5_TON_address,
    contract_5_TON_address,
} from "../../constants";

const FunctionalityButtons = () => {
    const { isWalletConnected, t } = useContext(ApplicationContext)!;

    return (
        <div className={`${!isWalletConnected ? "hidden" : "hidden sm:block"}`}>
            <div className="fixed left-[8.9%] bottom-[40%]">
                <SendTonButton
                    text={t("send0.5Ton")}
                    address={contract_0dot5_TON_address}
                    amountToSend={0.5}
                />
            </div>
            <div
                className={`fixed 
                             ${
                                 window.innerHeight < 700
                                     ? "left-[40%] bottom-[40%]"
                                     : " md:left-[25%] left-[10%] bottom-[21%]"
                             }`}
            >
                <SendTonButton
                    text={t("send2.5Ton")}
                    address={contract_2dot5_TON_address}
                    amountToSend={2.5}
                />
            </div>
            <div
                className={`fixed ${
                    window.innerHeight < 700
                        ? "left-[25%] bottom-[10%]"
                        : "left-[50%] translate-x-[-50%] bottom-[5%]"
                } `}
            >
                <SendTonButton
                    text={t("send10Ton")}
                    address={contract_10_TON_address}
                    amountToSend={10}
                />
            </div>
            <div
                className={`fixed ${
                    window.innerHeight < 700
                        ? "right-[25%] bottom-[10%]"
                        : "md:right-[25%] right-[10%] bottom-[21%]"
                }`}
            >
                <SendTonButton
                    text={t("send5Ton")}
                    address={contract_5_TON_address}
                    amountToSend={5}
                />
            </div>
            <div className="fixed right-[8.9%] bottom-[40%]">
                <SendTonButton
                    text={t("send1Ton")}
                    address={contract_1_TON_address}
                    amountToSend={1}
                />
            </div>
        </div>
    );
};

export default FunctionalityButtons;
