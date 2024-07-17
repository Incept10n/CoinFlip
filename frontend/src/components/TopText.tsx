import TopTextWithAnimation from "./TopTextWithAnimation";

const TopText = ({
    topTextAppear,
    appearingDelay,
}: {
    topTextAppear: boolean;
    appearingDelay: number;
}) => {
    return (
        <div
            className={`${topTextAppear ? "opacity-100" : "opacity-0"} w-[70%] 
                                transition-all duration-[2s] fixed top-[90px] 
                                left-[50%] translate-x-[-50%]`}
        >
            <TopTextWithAnimation appearingDelay={appearingDelay} />
        </div>
    );
};

export default TopText;
