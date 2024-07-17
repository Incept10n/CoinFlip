import { useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import TopText from "./TopText";
import PlayButton from "./PlayButton";
import Rules from "./Rules";
import ActuallCoinflip from "./ActuallCoinflip";

const Application = () => {
    const [topTextAppear, setTopTextAppear] = useState<boolean>(false);
    const [pressedPlay, setPressedPlay] = useState<boolean>(false);

    const appearingDelay: number = 1500;

    useEffect(() => {
        setTimeout(() => setTopTextAppear(true), appearingDelay);
    }, []);

    useEffect(() => {}, [pressedPlay]);

    return (
        <>
            <div
                className={`${pressedPlay ? "coin-image-bg-button-pressed" : "coin-image-bg"}`}
            />
            <TopText
                topTextAppear={topTextAppear}
                appearingDelay={appearingDelay}
                pressedPlay={pressedPlay}
            />
            <TonConnectButton
                className={`${topTextAppear ? "bottom-[130px]" : "bottom-[-60px]"} 
                                fixed translate-x-[-50%] 
                                transition-all duration-[1s] ease-in-out
                                ${pressedPlay ? "left-[15%]" : "left-[50%]"}`}
            />
            <PlayButton
                appearingDelay={appearingDelay}
                setPressedPlay={setPressedPlay}
                pressedPlay={pressedPlay}
            />
            <Rules appearingDelay={appearingDelay} pressedPlay={pressedPlay} />
            <ActuallCoinflip pressedPlay={pressedPlay} />
        </>
    );
};

export default Application;
