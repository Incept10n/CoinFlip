import TopTextWithAnimation from "./TopTextWithAnimation";

const TopText = ({
    topTextAppear,
    appearingDelay,
    pressedPlay,
}: {
    topTextAppear: boolean;
    appearingDelay: number;
    pressedPlay: boolean;
}) => {
    return (
        <div
            className={`${topTextAppear ? "opacity-100" : "opacity-0"} w-[70%] 
                                transition-all duration-[2s] fixed 
                                left-[50%] translate-x-[-50%]
                                ${pressedPlay ? "top-[-100px]" : "top-[90px]"}`}
        >
            <TopTextWithAnimation appearingDelay={appearingDelay} />
        </div>
    );
};

export default TopText;
