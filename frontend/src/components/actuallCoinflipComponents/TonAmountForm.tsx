import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const TonAmountForm = ({
    tonAmount,
    setTonAmount,
}: {
    tonAmount: string;
    setTonAmount: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [isDisplayInput, setIsDisplayInput] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setIsDisplayInput(true), 4000);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");

        setTonAmount(sanitizedValue);
    };

    return (
        <div className="text-gray-500 fixed top-[20%] left-[30%]">
            <TypeAnimation
                sequence={["", 1500, "Enter amount of TON coins: ", 1500]}
                speed={10}
                style={{ fontSize: "3.2em" }}
                repeat={0}
                cursor={false}
            />
            <div
                className={`${isDisplayInput ? "scale-100" : "scale-0"} flex-col float-right ml-[10px]
                            transition-all duration-[0.3s] ease-linear`}
            >
                <input
                    className="border-none outline-none bg-transparent 
                               overflow-hidden text-[3.2em] w-[270px] ml-[5px]"
                    type="text"
                    value={tonAmount}
                    maxLength={9}
                    onChange={handleInput}
                />
                <div className="h-[1px] bg-gray-500 w-[270px]" />
            </div>
        </div>
    );
};

export default TonAmountForm;
