import { useContext } from "react";
import { ApplicationContext } from "../Application";

import moonIcon from "/darkBg/nightlight.png";
import sunIcon from "/whiteBg/sunlight.png";

const DarkModeSwitchButton = () => {
    const { isDarkMode, setIsDarkMode } = useContext(ApplicationContext)!;

    return (
        <div className="fixed sm:top-[77px] top-[32px] sm:left-[56px] left-[22px] md:scale-100 scale-[0.8]">
            <button
                className={`w-[76px] h-[32px] flex items-center px-[6px] 
                        ${isDarkMode ? "border-[#798cc6]" : "border-black"}
                                bg-transparent border-[2px] rounded-[21px]`}
                onClick={() => setIsDarkMode((prevState) => !prevState)}
            >
                <div
                    className={`w-[25px] h-[25px] rounded-full flex justify-center items-center relative
                            ${isDarkMode ? "bg-black" : "bg-[#d9d9d9]"}
                            ${isDarkMode ? "ml-0" : "ml-[60%]"}
                            transition-all duration-[0.5s] ease-in-out`}
                >
                    <img
                        src={isDarkMode ? moonIcon : sunIcon}
                        alt="moon icon"
                        className="w-[16px] h-[16px]"
                    />
                </div>
            </button>
        </div>
    );
};

export default DarkModeSwitchButton;
