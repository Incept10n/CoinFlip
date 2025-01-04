import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { ApplicationContext } from "../../Application";

import image0 from "/loadingAnimation/loading0.png";
import image1 from "/loadingAnimation/loading1.png";
import image2 from "/loadingAnimation/loading2.png";
import image3 from "/loadingAnimation/loading3.png";
import image4 from "/loadingAnimation/loading4.png";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { sendTransactionToSmartContract } from "../../../helperFunctions";
import { ButtonState } from "../SendTonButton";

const images = [image0, image1, image2, image3, image4];

const SendingTransaction = ({
    address,
    setIsButtonGreen,
    setIsAnimationGoing,
    setIsHovered,
    setButtonState,
    amountToSend,
}: {
    address: string;
    setIsButtonGreen: Dispatch<SetStateAction<boolean>>;
    setIsAnimationGoing: Dispatch<SetStateAction<boolean>>;
    setIsHovered: Dispatch<SetStateAction<boolean>>;
    setButtonState: Dispatch<SetStateAction<ButtonState>>;
    amountToSend: number;
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { t, isDarkMode } = useContext(ApplicationContext)!;

    const [tonConnectUI, _] = useTonConnectUI();

    const sendTransaction = () => {
        setIsAnimationGoing(true);
        setIsButtonGreen(true);
        setIsHovered(false);

        sendTransactionToSmartContract(amountToSend, address, tonConnectUI)
            .then(() => {
                setButtonState(ButtonState.Success);
            })
            .catch(() => {
                setButtonState(ButtonState.SomethingWentWrong);
            })
            .finally(() => {
                setIsAnimationGoing(false);
                setIsButtonGreen(false);
            });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 800);

        sendTransaction();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className={`${isDarkMode ? "custom-white-text" : "text-black"} 
                        absolute top-[-90%] left-[50%] translate-x-[-50%]
                        flex-col text-center w-full`}
        >
            <div className="mb-[8px]">{t("proceeding")}</div>
            <div className="w-full flex justify-center mb-[14px]">
                <img src={images[currentIndex]} alt="loading animation" />
            </div>
        </div>
    );
};

export default SendingTransaction;
