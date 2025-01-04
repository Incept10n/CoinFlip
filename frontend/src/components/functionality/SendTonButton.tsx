import { useContext, useState } from "react";
import { ApplicationContext } from "../Application";
import LookingForPlayer from "./button/LookingForPlayer";
import PlayerToPlayWith from "./button/PlayerToPlayWith";
import CheckForPlayers from "./button/CheckForPlayers";
import SendingTransaction from "./button/SendingTransaction";
import PlayerNotFound from "./button/PlayerNotFound";
import Success from "./button/Success";
import SomethingWentWrong from "./button/SomethingWentWrong";

export enum ButtonState {
    CheckForAvailablePlayer,
    LookingForPlayer,
    PlayerFound,
    PlayerNotFound,
    SendingTransaction,
    Success,
    SomethingWentWrong,
}

const SendTonButton = ({
    text,
    address,
    amountToSend,
}: {
    text: string;
    address: string;
    amountToSend: number;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { isDarkMode } = useContext(ApplicationContext)!;
    const [isAnimationGoing, setIsAnimationGoing] = useState<boolean>(false);
    const [isButtonGreen, setIsButtonGreen] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<ButtonState>(
        ButtonState.CheckForAvailablePlayer,
    );

    const renderButtonState = (): JSX.Element => {
        switch (buttonState) {
            case ButtonState.CheckForAvailablePlayer:
                return <CheckForPlayers setButtonState={setButtonState} />;
            case ButtonState.LookingForPlayer:
                return (
                    <LookingForPlayer
                        setButtonState={setButtonState}
                        address={address}
                    />
                );
            case ButtonState.PlayerFound:
                return <PlayerToPlayWith setButtonState={setButtonState} />;
            case ButtonState.PlayerNotFound:
                return <PlayerNotFound setButtonState={setButtonState} />;
            case ButtonState.SendingTransaction:
                return (
                    <SendingTransaction
                        address={address}
                        setIsButtonGreen={setIsButtonGreen}
                        setIsAnimationGoing={setIsAnimationGoing}
                        setIsHovered={setIsHovered}
                        setButtonState={setButtonState}
                        amountToSend={amountToSend}
                    />
                );
            case ButtonState.Success:
                return <Success setButtonState={setButtonState} />;
            case ButtonState.SomethingWentWrong:
                return <SomethingWentWrong setButtonState={setButtonState} />;
        }
    };

    return (
        <div className="relative text-center lg:scale-100 sm:scale-[0.7] scale-100">
            {renderButtonState()}
            <button
                className={`${isDarkMode ? "custom-white-text border-[#becbe4]" : "text-black border-black"} 
                       w-[213px] min-h-[67px] bg-transparent relative
                       text-[25px] overflow-hidden button-shadow
                       border-[2px] rounded-[24px]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                    if (isAnimationGoing) {
                        return;
                    }
                    setButtonState(ButtonState.SendingTransaction);
                }}
            >
                <div
                    className={`${isHovered ? "left-[-2px]" : "left-[-110%]"} 
                                ${isDarkMode ? "border-[#becbe4]" : "border-black"}
                                ${isButtonGreen ? "bg-green-400" : "bg-[#6093f5]"}
                                absolute top-[-2px] w-[213px] h-[110%]
                                opacity-[0.56] border-[2px] rounded-[24px]
                                transition-all duration-[0.5s] ease-out z-[0]`}
                />
                <span className="relative z-10">{text}</span>
            </button>
        </div>
    );
};

export default SendTonButton;
