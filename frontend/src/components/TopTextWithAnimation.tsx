import { TypeAnimation } from "react-type-animation";

const TopTextWithAnimation = ({
    appearingDelay,
}: {
    appearingDelay: number;
}) => {
    return (
        <div className="text-gray-500 text-center">
            <TypeAnimation
                sequence={[
                    appearingDelay,
                    "First decentralized coinflip",
                    3000,
                    "Integration with TON blockchain",
                    3000,
                ]}
                speed={5}
                style={{ fontSize: "4em" }}
                repeat={Infinity}
                preRenderFirstString={true}
            />
        </div>
    );
};

export default TopTextWithAnimation;
