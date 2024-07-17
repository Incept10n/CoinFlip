import { useEffect, useState } from "react";
import TopTextWithAnimation from "./TopTextWithAnimation";
import { TonConnectButton } from "@tonconnect/ui-react";

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
            <div className="coin-image-bg"></div>
            <div
                className={`${topTextAppear ? "opacity-100" : "opacity-0"} w-[70%] 
                                transition-all duration-[2s] fixed top-[90px] 
                                left-[50%] translate-x-[-50%]`}
            >
                <TopTextWithAnimation appearingDelay={appearingDelay} />
            </div>
            <TonConnectButton
                className={`${topTextAppear ? "bottom-[130px]" : "bottom-[-60px]"} 
                                fixed left-[50%] translate-x-[-50%] 
                                transition-all duration-[1s] ease-in-out`}
            />
        </>
    );
};

export default Application;
