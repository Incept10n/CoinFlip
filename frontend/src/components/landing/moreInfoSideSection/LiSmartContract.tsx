const LiSmartContract = ({ lable, link }: { lable: string; link: string }) => {
    return (
        <li className="flex items-center justify-around">
            <span className="text-right w-[65px]">{lable}</span>
            <a
                className="overflow-hidden whitespace-nowrap text-ellipsis 
                                   w-[73%] inline-block ml-[19px] 
                                   text-blue-600 underline hover:text-blue-800"
                href={link}
                target="_blank"
            >
                {link}
            </a>
        </li>
    );
};

export default LiSmartContract;
