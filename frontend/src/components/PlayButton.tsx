import { useEffect, useState } from "react";

const PlayButton = ({
    appearingDelay,
    setPressedPlay,
    pressedPlay,
}: {
    appearingDelay: number;
    setPressedPlay: React.Dispatch<React.SetStateAction<boolean>>;
    pressedPlay: boolean;
}) => {
    const [isButtonDisplayed, setIsButtonDisplayed] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setIsButtonDisplayed(true), appearingDelay + 1700);
    }, []);

    return (
        <>
            <span
                className={`fixed text-gray-500 text-[2em] hover:cursor-pointer
                    border-[1px] border-gray-500 rounded-[12px] p-[6px]
                    top-[55%] translate-y-[-50%] translate-x-[-50%] 
                    w-[200px] text-center hover:w-[320px] transition-all duration-[0.5s] ease-out
                    hover:text-gray-400 hover:border-gray-400 
                    ${isButtonDisplayed ? "opacity-100" : "opacity-0"}
                    ${pressedPlay ? "left-[-100px]" : "left-[20%]"}`}
                onClick={() => setPressedPlay(true)}
            >
                Play now
            </span>
        </>
    );
};

export default PlayButton;
