import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ButtonState } from "../SendTonButton";
import { ApplicationContext } from "../../Application";

import warningDarkModeLogo from "/darkBg/errorDarkMode.png";
import warningWhiteModeLogo from "/whiteBg/errorWhiteMode.png";

const SomethingWentWrong = ({
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
                       absolute w-full top-[-80%] -translate-y-1/2 flex flex-col items-center`}
        >
            <div className="mb-[8px]">{t("wrong")}</div>
            <img
                src={isDarkMode ? warningDarkModeLogo : warningWhiteModeLogo}
                alt="success logo"
            />
        </div>
    );
};

export default SomethingWentWrong;
