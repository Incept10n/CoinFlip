import { useContext, useEffect, useRef, useState } from "react";
import { ApplicationContext } from "../../Application";
import LiSmartContract from "./LiSmartContract";
import NotRefundablePopup from "./NotRefundablePopup";
import {
    contract_0dot5_link,
    contract_10_link,
    contract_1_link,
    contract_2dot5_link,
    contract_5_link,
} from "../../../constants";

const AdditionalInfo = () => {
    const { t } = useContext(ApplicationContext)!;

    const [isDisplayNotRefundPopup, setIsDisplayNotRefundPopup] =
        useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setIsDisplayNotRefundPopup(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="mt-[28px]">
            <h1 className="sm:text-[29px] text-[20px] text-center font-semibold">
                {t("additionalInfo")}
            </h1>
            <p className="mt-[30px]">{t("paragraph1")}</p>
            <p className="mt-[35px]">{t("view5LinksHeader")}</p>
            <ul className="mt-[35px] space-y-[14px]">
                <LiSmartContract
                    lable={t("link1Label")}
                    link={contract_0dot5_link}
                />
                <LiSmartContract
                    lable={t("link2Label")}
                    link={contract_1_link}
                />
                <LiSmartContract
                    lable={t("link3Label")}
                    link={contract_2dot5_link}
                />
                <LiSmartContract
                    lable={t("link4Label")}
                    link={contract_5_link}
                />
                <LiSmartContract
                    lable={t("link5Label")}
                    link={contract_10_link}
                />
            </ul>
            <p className="mt-[24px]">{t("paragraph2")}</p>
            <p className="mt-[24px]">{t("paragraph3")}</p>
            <div ref={divRef} className="my-[35px]  relative">
                <div
                    className="flex justify-center items-center hover:cursor-pointer"
                    onClick={() =>
                        setIsDisplayNotRefundPopup((prevState) => !prevState)
                    }
                >
                    <p className="select-none">{t("notRefundable")}</p>
                    <div
                        className="bg-[url(/whiteBg/infoWhiteMode.png)] bg-contain bg-no-repeat
                               w-[20px] h-[20px] ml-[7px] relative"
                    >
                        <div onClick={(event) => event.stopPropagation()}>
                            {isDisplayNotRefundPopup && <NotRefundablePopup />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfo;
