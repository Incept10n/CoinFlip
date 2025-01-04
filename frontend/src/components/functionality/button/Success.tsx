import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ApplicationContext } from "../../Application";
import successLogoLightMode from "/whiteBg/playerReadyWhiteMode.png";
import successLogoDarkMode from "/darkBg/playerReadyDarkMode.png";
import { ButtonState } from "../SendTonButton";

const Success = ({
    setButtonState,
}: {
    setButtonState: Dispatch<SetStateAction<ButtonState>>;
}) => {
    const { t, isDarkMode } = useContext(ApplicationContext)!;

    useEffect(() => {
        setTimeout(() => {
            setButtonState(ButtonState.CheckForAvailablePlayer);
        }, 2000);
    }, []);

    return (
        <div
            className={`${isDarkMode ? "custom-white-text" : "text-black"} text-[20px] text-center
                       absolute w-full top-[-110%] flex flex-col items-center`}
        >
            <div>{t("success")}</div>
            <img
                src={isDarkMode ? successLogoDarkMode : successLogoLightMode}
                alt="success logo"
            />
        </div>
    );
};

export default Success;
