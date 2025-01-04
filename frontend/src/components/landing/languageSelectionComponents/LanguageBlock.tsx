import { useContext } from "react";
import { ApplicationContext } from "../../Application";
import { IsLanguageSelectionExpandedContext } from "../LanguageSelect";

const LanguageBlock = ({
    lang,
    emojiPath,
    code,
}: {
    lang: string;
    emojiPath: string;
    code: string;
}) => {
    const { changeLanguage } = useContext(ApplicationContext)!;

    const { setIsExpanded } = useContext(IsLanguageSelectionExpandedContext)!;

    const handleLanguageOnClick = () => {
        changeLanguage(code);
        setIsExpanded(false);
    };

    return (
        <div
            className="custom-white-text flex items-center py-[10px] 
                        rounded-[10px] hover:cursor-pointer hover:bg-[#798cc6]"
            onClick={handleLanguageOnClick}
        >
            <div
                className={`ml-[22px] w-[20px] h-[20px] 
                            bg-contain bg-no-repeat bg-center`}
                style={{ backgroundImage: `url(/${emojiPath})` }}
            />
            <div className="ml-[15px]">{lang}</div>
        </div>
    );
};

export default LanguageBlock;
