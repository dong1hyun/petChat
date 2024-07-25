import { useNavigate } from "react-router-dom"
import { ReactComponent as Back } from "../assets/back.svg"

export const InputBtn = "w-[340px] h-[62px] px-[72px] py-[22px] bg-[#2d87f1] rounded-[10px] m-5"
export const InputBtn_disable = "w-[340px] h-[62px] px-[72px] py-[22px] bg-[#1a2f49] rounded-[10px] m-5"

export const Container = "flex flex-col gap-10 min-h-screen items-center font-pretendard"

export function Title({title}: {title: string}) {
    const navigate = useNavigate();
    return <div className="text-center text-white text-lg font-semibold leading-normal pt-8 relative w-[390px]"><Back onClick={() => navigate(-1)} className="absolute left-7 top-9 cursor-pointer" />{title}</div>
}

export function NameChip({ name }: { name: string }) {
    return <div className="h-[30px] px-4 py-0.5 mr-1 bg-[#2d87f1] rounded-[50px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#1d1f23] text-xl font-bold leading-relaxed">{name}</div>
    </div>
}

export function HashTag({ text }: { text: string }) {
    return <div className="h-7 px-3 bg-[#1d1f23] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#2d87f1] text-xs font-normal leading-none">#{text}</div>
    </div>
}