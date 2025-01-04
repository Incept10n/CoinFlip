import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ApplicationContext } from "../../Application";
import darkModeDoneAll from "/darkBg/playerReadyDarkMode.png";
import whiteModeDoneAll from "/whiteBg/playerReadyWhiteMode.png";
import { ButtonState } from "../SendTonButton";

const PlayerToPlayWith = ({
    setButtonState,
}: {
    setButtonState: Dispatch<SetStateAction<ButtonState>>;
}) => {
    const { t, isDarkMode } = useContext(ApplicationContext)!;

    useEffect(() => {
        setTimeout(
            () => setButtonState(ButtonState.CheckForAvailablePlayer),
            3000,
        );
    }, []);

    return (
        <div>
            <div
                className={`${isDarkMode ? "custom-white-text" : "text-black"}
                            text-[20px] text-center absolute w-[130%]
                            top-[-70%] -translate-y-1/2 left-[50%] translate-x-[-50%]`}
            >
                <div>{t("toPlayWith")}</div>
                <div className="flex justify-center">
                    <img
                        src={isDarkMode ? darkModeDoneAll : whiteModeDoneAll}
                        alt="ready icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerToPlayWith;
