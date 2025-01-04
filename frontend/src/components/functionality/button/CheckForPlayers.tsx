import { Dispatch, SetStateAction, useContext } from "react";
import { ApplicationContext } from "../../Application";
import { ButtonState } from "../SendTonButton";

const CheckForPlayers = ({
    setButtonState,
}: {
    setButtonState: Dispatch<SetStateAction<ButtonState>>;
}) => {
    const { t } = useContext(ApplicationContext)!;

    return (
        <div className="absolute top-[-60%] -translate-y-1/2 flex justify-center w-full ">
            <button
                className="custom-white-text text-[17px] hover:bg-[#404759]
                        custom-blue-bg rounded-[7px] p-[3px]"
                onClick={() => setButtonState(ButtonState.LookingForPlayer)}
            >
                {t("checkForPlayers")}
            </button>
        </div>
    );
};

export default CheckForPlayers;
