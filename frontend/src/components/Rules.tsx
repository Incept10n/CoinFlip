import { useEffect, useState } from "react";

const Rules = ({ appearingDelay }: { appearingDelay: number }) => {
    const [isButtonDisplayed, setIsButtonDisplayed] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setIsButtonDisplayed(true), appearingDelay + 1700);
    }, []);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <span
                className={`fixed text-gray-500 text-[2em] hover:cursor-pointer
                    border-[1px] border-gray-500 rounded-[12px] p-[6px] px-[30px]
                    top-[55%] translate-y-[-50%] right-[20%] translate-x-[50%] 
                    w-[200px] text-center hover:w-[430px] transition-all duration-[0.5s] ease-out
                    hover:text-gray-400 hover:border-gray-400 ${isHovered ? "h-[300px]" : "h-[60px]"}
                    ${isButtonDisplayed ? "opacity-100" : "opacity-0"} overflow-hidden`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Rules
                <div className="text-[0.6em] text-left mt-[40px]">
                    Everything is as simple as it can get!
                    <br />
                    1) Put amount of coins you want to bet
                    <br />
                    2) Press Go
                    <br />
                    3) And win with 50% chance!
                    <br />
                    <div className="mt-[20px]">
                        The result is being determined by smart contract on TON
                        blockchain!
                    </div>
                </div>
            </span>
        </>
    );
};

export default Rules;
