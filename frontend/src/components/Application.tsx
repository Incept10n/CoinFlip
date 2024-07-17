import { useEffect, useState } from "react";
import TopTextWithAnimation from "./TopTextWithAnimation";
import { TonConnectButton } from "@tonconnect/ui-react";
import TopText from "./TopText";
import PlayButton from "./PlayButton";
import Rules from "./Rules";

const Application = () => {
    const [topTextAppear, setTopTextAppear] = useState<boolean>(false);

    const appearingDelay: number = 1500;

    useEffect(() => {
        setTimeout(() => setTopTextAppear(true), appearingDelay);
    }, []);

    return (
        <>
            {
                // TODO: add some text at the left and at the right of the coin
            }
            <div className="coin-image-bg" />
            <TopText
                topTextAppear={topTextAppear}
                appearingDelay={appearingDelay}
            />
            <TonConnectButton
                className={`${topTextAppear ? "bottom-[130px]" : "bottom-[-60px]"} 
                                fixed left-[50%] translate-x-[-50%] 
                                transition-all duration-[1s] ease-in-out`}
            />
            <PlayButton appearingDelay={appearingDelay} />
            <Rules appearingDelay={appearingDelay} />
        </>
    );
};

export default Application;
