import Image from "next/image";
import { ButtonProps } from "../../types/globals.d";

export default function Button({ text, onClick, iconSrc, iconAlt = "", iconSize = 16 }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className="bg-toDoButtonBlue text-white py-2 px-4 rounded-md shadow-lg h-[52px] w-[736px] flex items-center justify-center gap-x-2"
        >
            {text}
            {iconSrc && <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />}
        </button>
    );
}
