import { useContext } from "react";
import {
    MobileButtonChoice,
    MobileSelectButtonContext,
} from "../MobileChooseButton";

const SelectItem = ({
    text,
    value,
    isLastOne = false,
}: {
    text: string;
    value: MobileButtonChoice;
    isLastOne?: boolean;
}) => {
    const { setIsChoosingTonAmount, setTonAmount } = useContext(
        MobileSelectButtonContext,
    )!;

    return (
        <div
            className="flex flex-col items-center w-full mt-[23px]"
            onClick={() => {
                setTonAmount(value);
                setIsChoosingTonAmount(false);
            }}
        >
            <div className="text-[25px] text-[#686161] text-center">{text}</div>
            {!isLastOne && (
                <div className="w-[90%] bg-[#686161] h-[1px] mt-[13px]" />
            )}
        </div>
    );
};

export default SelectItem;
