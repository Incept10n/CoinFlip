import { useContext, useEffect, useRef, useState } from "react";
import { ApplicationContext } from "../Application";
import MoreInfoSidebar from "./MoreInfoSidebar";

const MoreInfo = () => {
    const { t, isDarkMode, isWalletConnected } =
        useContext(ApplicationContext)!;
    const [isMoreInfoExpanded, setIsMoreInfoExpanded] =
        useState<boolean>(false);

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setIsMoreInfoExpanded(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    });

    return (
        <div ref={divRef}>
            <div
                className={`${isDarkMode ? "custom-white-text" : "text-black"} 
                            ${
                                isWalletConnected
                                    ? `sm:bottom-[79px] bottom-[30px] sm:right-[58px] sm:left-auto sm:translate-x-0 
                                       left-1/2 -translate-x-1/2 right-auto`
                                    : "bottom-[40px] left-1/2 -translate-x-1/2 sm:bottom-[63px]"
                            }
                            fixed text-[25px] flex-col hover:cursor-pointer z-0`}
                onClick={() => setIsMoreInfoExpanded((prevState) => !prevState)}
            >
                <div className="flex justify-around items-center">
                    <div className="select-none text-center leading-7">
                        {t("moreInfo")}
                    </div>
                    <div
                        className={`
                           ${
                               isDarkMode
                                   ? "bg-[url(/darkBg/infoDarkMode.png)]"
                                   : "bg-[url(/whiteBg/infoWhiteMode.png)]"
                           }
                           w-[24px] h-[24px] ml-[7px] flex-shrink-0
                           bg-center bg-no-repeat`}
                    />
                </div>
                <div
                    className={`${isDarkMode ? "custom-white-bg" : "bg-black"} h-[1.2px] sm:mt-0`}
                />
            </div>
            <MoreInfoSidebar
                isMoreInfoExpanded={isMoreInfoExpanded}
                setIsMoreInfoExpanded={setIsMoreInfoExpanded}
            />
        </div>
    );
};

export default MoreInfo;
