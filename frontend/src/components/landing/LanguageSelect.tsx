import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import LanguageSelectButtonIcons from "./languageSelectionComponents/LanguageSelectButtonIcons";
import LanguageBlockList from "./languageSelectionComponents/LanguageBlockList";
import { ApplicationContext } from "../Application";

interface LanguageSelectionProps {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export const IsLanguageSelectionExpandedContext =
    createContext<LanguageSelectionProps | null>(null);

const LanguageSelect = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { currentLanguageCode } = useContext(ApplicationContext)!;

    const handleOnClick = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setIsExpanded(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div ref={divRef}>
            <div className="fixed sm:top-[77px] top-[28px] sm:right-[76px] right-[32px] z-10">
                <IsLanguageSelectionExpandedContext.Provider
                    value={{ isExpanded, setIsExpanded }}
                >
                    <div
                        className={`custom-blue-bg custom-white-text 
                                md:w-[170px] w-[110px] h-[35px] pl-[16px] pr-[8px] 
                                rounded-[10px] z-10
                                flex justify-between items-center 
                                ${
                                    isExpanded &&
                                    window.innerWidth <= 640 &&
                                    "fixed top-0 left-0 w-full rounded-none"
                                }`}
                        onClick={handleOnClick}
                    >
                        <span className="text-[20px] select-none">
                            {currentLanguageCode}
                        </span>
                        <LanguageSelectButtonIcons isExpanded={isExpanded} />
                    </div>
                    <div
                        className={`sm:hidden fixed top-0 left-0 custom-blue-bg w-full h-[35px] z-0
                                     ${!isExpanded && "translate-y-[-35px]"}
                                     transition-all duration-[0.5s] ease-out`}
                    />
                    <div
                        className={`hidden sm:block ${isExpanded ? "h-[350px]" : "h-[0px]"}
                            custom-blue-bg md:w-[170px] w-[152px] rounded-[10px] mt-[3px]
                            transition-all duration-[0.5s] ease-out overflow-hidden`}
                    >
                        <LanguageBlockList />
                    </div>
                    <div
                        className={`sm:hidden custom-blue-bg rounded-b-[10px] z-20
                                ${isExpanded ? "h-[350px]" : "h-[0px] translate-y-[-35px]"}
                                transition-all duration-[0.5s] ease-out overflow-hidden
                                fixed top-[35px] left-0 w-full`}
                    >
                        <LanguageBlockList />
                    </div>
                </IsLanguageSelectionExpandedContext.Provider>
            </div>
        </div>
    );
};

export default LanguageSelect;
