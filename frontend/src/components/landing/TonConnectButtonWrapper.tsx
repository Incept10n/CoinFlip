import {
    Locales,
    TonConnectButton,
    useTonConnectUI,
} from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import { ApplicationContext } from "../Application";

const TonConnectButtonWrapper = () => {
    const [_, setOptions] = useTonConnectUI();
    const { currentLanguageCode, isWalletConnected } =
        useContext(ApplicationContext)!;

    useEffect(() => {
        const languageCodeFormatted =
            currentLanguageCode[0].toLowerCase() + currentLanguageCode[1];

        setOptions({ language: languageCodeFormatted as Locales });
    }, [currentLanguageCode]);

    return (
        <div
            className={`fixed 
                        ${
                            isWalletConnected
                                ? `bottom-auto top-[28px] left-[42%] 
                                   lg:-translate-x-1/2 sm:-translate-x-0 -translate-x-1/2 scale-[0.7]
                                   sm:bottom-[12%] sm:left-[7%] sm:top-auto sm:scale-100`
                                : "bottom-[15%] left-1/2 -translate-x-1/2"
                        }`}
        >
            <TonConnectButton />
        </div>
    );
};

export default TonConnectButtonWrapper;
