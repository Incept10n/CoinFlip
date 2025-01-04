import { useContext } from "react";
import { ApplicationContext } from "../Application";

const TonLogo = () => {
    const { isDarkMode, isWalletConnected } = useContext(ApplicationContext)!;

    return (
        <div
            className={`
                fixed left-1/2 -translate-x-1/2 sm:top-[30%] sm:bottom-auto
                bg-no-repeat bg-contain bg-center
                ${window.innerHeight <= 700 && "hidden"}
                ${
                    isDarkMode
                        ? "bg-[url(/darkBg/tonLogoDarkBg.png)]"
                        : "bg-[url(/whiteBg/tonLogoWhiteTheme.png)]"
                }
                min-[1700px]:w-[25%] md:w-[25%] 
                md:h-[45%] animate-floating
                ${
                    isWalletConnected
                        ? "w-[98px] h-[98px] top-auto bottom-[15%] -translate-x-1/2"
                        : "w-[188px] h-[34%] top-[30%]"
                }`}
        />
    );
};

export default TonLogo;
