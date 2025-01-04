import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ApplicationContext } from "../Application";
import SelectTonMenu from "./mobileChooseButton/SelectTonMenu";
import SendTonButton from "./SendTonButton";
import {
    contract_0dot5_TON_address,
    contract_10_TON_address,
    contract_1_TON_address,
    contract_2dot5_TON_address,
    contract_5_TON_address,
} from "../../constants";

export const enum MobileButtonChoice {
    none,
    ton0dot5,
    ton1,
    ton2dot5,
    ton5,
    ton10,
}

export const MobileSelectButtonContext = createContext<{
    setIsChoosingTonAmount: Dispatch<SetStateAction<boolean>>;
    setTonAmount: Dispatch<SetStateAction<MobileButtonChoice>>;
} | null>(null);

const MobileChooseButton = () => {
    const { t, isDarkMode, isWalletConnected } =
        useContext(ApplicationContext)!;
    const [isChoosingTonAmount, setIsChoosingTonAmount] =
        useState<boolean>(false);
    const [tonAmount, setTonAmount] = useState<MobileButtonChoice>(
        MobileButtonChoice.none,
    );
    const [forceReloadKey, setForceReloadKey] = useState<number>(0);
    const mobileChooseButtonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setForceReloadKey((prevState) => prevState + 1);
    }, [tonAmount]);

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (
                mobileChooseButtonRef &&
                !mobileChooseButtonRef.current?.contains(event.target as Node)
            ) {
                setIsChoosingTonAmount(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const renderText = () => {
        switch (tonAmount) {
            case MobileButtonChoice.none:
                return t("chooseButtonMobile");
            case MobileButtonChoice.ton0dot5:
                return "0.5 TON";
            case MobileButtonChoice.ton1:
                return "1 TON";
            case MobileButtonChoice.ton2dot5:
                return "2.5 TON";
            case MobileButtonChoice.ton5:
                return "5 TON";
            case MobileButtonChoice.ton10:
                return "10 TON";
        }
    };

    const getButtonInfo = (): {
        text: string;
        address: string;
        amount: number;
    } => {
        switch (tonAmount) {
            case MobileButtonChoice.none:
                return { text: "hehe", address: "hehe", amount: -1 };
            case MobileButtonChoice.ton0dot5:
                return {
                    text: t("send0.5Ton"),
                    address: contract_0dot5_TON_address,
                    amount: 0.5,
                };
            case MobileButtonChoice.ton1:
                return {
                    text: t("send1Ton"),
                    address: contract_1_TON_address,
                    amount: 1,
                };
            case MobileButtonChoice.ton2dot5:
                return {
                    text: t("send2.5Ton"),
                    address: contract_2dot5_TON_address,
                    amount: 2.5,
                };
            case MobileButtonChoice.ton5:
                return {
                    text: t("send5Ton"),
                    address: contract_5_TON_address,
                    amount: 5,
                };
            case MobileButtonChoice.ton10:
                return {
                    text: t("Send 10 TON"),
                    address: contract_10_TON_address,
                    amount: 10,
                };
        }
    };

    return (
        <MobileSelectButtonContext.Provider
            value={{ setIsChoosingTonAmount, setTonAmount }}
        >
            <div
                className={`${!isWalletConnected && "hidden"} 
                            fixed top-[30%] left-1/2 -translate-x-1/2 w-[96%]`}
                ref={mobileChooseButtonRef}
            >
                <div
                    className={`${isDarkMode ? "custom-white-text" : "text-black"}
                            border-[2px] border-[#becbe4] rounded-[24px] 
                            text-center text-[20px] py-[21px] mobile-choose-amount-shadow
                            ${isChoosingTonAmount && "bg-gray-100 bg-opacity-[0.1]"}`}
                    onClick={() => setIsChoosingTonAmount(true)}
                >
                    {renderText()}
                </div>
            </div>
            {isChoosingTonAmount && <SelectTonMenu />}
            {tonAmount !== MobileButtonChoice.none && (
                <div
                    className={`${window.innerHeight <= 700 ? "bottom-[25%]" : "bottom-[35%]"} 
                                fixed left-1/2 -translate-x-1/2 
                                bg-[#6093f5] bg-opacity-[0.56] rounded-[24px]`}
                >
                    <SendTonButton
                        key={forceReloadKey}
                        text={getButtonInfo().text}
                        address={getButtonInfo().address}
                        amountToSend={getButtonInfo().amount}
                    />
                </div>
            )}
        </MobileSelectButtonContext.Provider>
    );
};

export default MobileChooseButton;
