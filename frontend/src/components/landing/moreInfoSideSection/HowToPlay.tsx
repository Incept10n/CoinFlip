import { useContext } from "react";
import { ApplicationContext } from "../../Application";

const HowToPlay = () => {
    const { t } = useContext(ApplicationContext)!;

    return (
        <div>
            <h1 className="sm:text-[29px] text-[20px] font-semibold text-center">
                {t("howToPlay")}
            </h1>
            <ol className="list-decimal list-inside mt-[30px] space-y-[19px]">
                <li>{t("step1")}</li>
                <li>{t("step2")}</li>
                <li>{t("step3")}</li>
                <li>{t("step4")}</li>
            </ol>
        </div>
    );
};

export default HowToPlay;
