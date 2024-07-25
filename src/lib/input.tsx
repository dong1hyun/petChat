import { InputHTMLAttributes } from "react";

export const inputBox = "w-[340px] pl-[18px] pr-2.5 py-4 rounded-[10px] text-[white] bg-[#3d3f46] text-base font-normal leading-tight"
export const errorInputBox = "w-[340px] pl-[18px] pr-2.5 py-4 rounded-[10px] text-[#ff6678] bg-[#ff6678]/10  border border-[#773038] text-base font-normal leading-tight"

export const errorMsg = "text-[#ff6678] text-sm font-normal leading-[18.20px]"

export function ErrorMsg({errors}: {errors: string[]}) {
    return (
        <>
            {errors.map((error, i) => (
                <div key={i} className="text-[#ff6678] text-sm font-normal leading-[18.20px]">{error}</div>
            ))}
        </>
    )
}