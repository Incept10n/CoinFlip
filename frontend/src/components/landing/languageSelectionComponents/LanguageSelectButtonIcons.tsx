const LanguageSelectButtonIcons = ({ isExpanded }: { isExpanded: boolean }) => {
    return (
        <div className="flex justify-between items-center w-[51px]">
            <div className={`bg-[url(/lang.png)] w-[24px] h-[24px] bg-cover`} />
            <div
                className={`${isExpanded ? "rotate-180" : "rotate-0"} 
                                     bg-[url(/arrow.png)] w-[20px] h-[20px]
                                     transition-all duration-[0.5s]`}
            />
        </div>
    );
};

export default LanguageSelectButtonIcons;
