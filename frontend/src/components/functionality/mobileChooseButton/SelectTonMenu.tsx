import { useContext } from "react";
import {
    MobileButtonChoice,
    MobileSelectButtonContext,
} from "../MobileChooseButton";
import SelectItem from "./SelectItem";

const SelectTonMenu = () => {
    const { setIsChoosingTonAmount } = useContext(MobileSelectButtonContext)!;

    return (
        <div>
            <div
                className="fixed top-[15%] pt-[29px] z-20
                            w-full h-[445px] bg-[#d9d9d9] rounded-[32px]"
            >
                <div
                    className="absolute bg-[url(/close.png)] 
                                w-[32px] h-[32px] top-[5%] right-[5%]"
                    onClick={() => setIsChoosingTonAmount(false)}
                />
                <SelectItem
                    text="0.5 TON"
                    value={MobileButtonChoice.ton0dot5}
                />
                <SelectItem text="1 TON" value={MobileButtonChoice.ton1} />
                <SelectItem
                    text="2.5 TON"
                    value={MobileButtonChoice.ton2dot5}
                />
                <SelectItem text="5 TON" value={MobileButtonChoice.ton5} />
                <SelectItem
                    text="10 TON"
                    value={MobileButtonChoice.ton10}
                    isLastOne={true}
                />
            </div>
        </div>
    );
};

export default SelectTonMenu;
