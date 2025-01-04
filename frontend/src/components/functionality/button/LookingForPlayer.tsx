import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import image0 from "/loadingAnimation/loading0.png";
import image1 from "/loadingAnimation/loading1.png";
import image2 from "/loadingAnimation/loading2.png";
import image3 from "/loadingAnimation/loading3.png";
import image4 from "/loadingAnimation/loading4.png";
import { ApplicationContext } from "../../Application";
import { ButtonState } from "../SendTonButton";
import { fireGetterMethod } from "../../../helperFunctions";

const images = [image0, image1, image2, image3, image4];

const LookingForPlayer = ({
    setButtonState,
    address,
}: {
    setButtonState: Dispatch<SetStateAction<ButtonState>>;
    address: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { t, isDarkMode } = useContext(ApplicationContext)!;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 800);

        fireGetterMethod(address)
            .then((result) => {
                if (result === 0) {
                    setButtonState(ButtonState.PlayerNotFound);
                } else if (result === 1) {
                    setButtonState(ButtonState.PlayerFound);
                }

                clearInterval(intervalId);
            })
            .catch(() => {
                setButtonState(ButtonState.SomethingWentWrong);
            });

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className={`${isDarkMode ? "custom-white-text" : "text-black"} 
                        absolute top-[-90%] left-[50%] translate-x-[-50%]
                        flex-col text-center w-full`}
        >
            <div className="mb-[8px]">{t("looking")}</div>
            <div className="w-full flex justify-center mb-[14px]">
                <img src={images[currentIndex]} alt="loading animation" />
            </div>
        </div>
    );
};

export default LookingForPlayer;
