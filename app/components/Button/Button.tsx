import Image from "next/image";
import { ButtonProps } from "../../types/globals.d";

export default function Button({ text, onClick, iconSrc, iconAlt = "", iconSize = 16 }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[70%] max-w-[736px] h-[52px] bg-toDoButtonBlue text-white py-2 px-4 rounded-md shadow-lg flex items-center justify-center gap-x-2"
        >
            {text}
            {iconSrc && <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />}
        </button>
    );
}
