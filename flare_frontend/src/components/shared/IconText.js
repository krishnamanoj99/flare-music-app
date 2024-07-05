import { Icon } from "@iconify/react/dist/iconify.js";
import { act } from "react";
import { Link } from "react-router-dom";

const IconText = ({iconName, iconText, active, targetLink, onClick}) => {
    return (
        <Link to={targetLink} className="block">
        <div className="flex w-full pr-4 pb-3 cursor-pointer" onClick={onClick}>
            <div className="py-2 px-4">
                <Icon icon={iconName} 
                color={active? "white" : "black"}
                fontSize="27"/>
            </div>

            <div className={` ${active? "text-white" : "text-black"} text-sm font-semibold pt-3 hover:text-white`}>{iconText}</div>
        </div>
        </Link>
    );
}

export default IconText;