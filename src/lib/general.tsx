import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as Back } from "../assets/back.svg"
import styled from "styled-components"
import { ReactComponent as Home } from "../assets/home.svg"
import { ReactComponent as BlueHome } from "../assets/blueHome.svg"
import { ReactComponent as Chat } from "../assets/chat.svg"
import { ReactComponent as Man } from "../assets/man.svg"
import { ReactComponent as BlueMan } from "../assets/blueMan.svg"

export const InputBtn = "w-[340px] h-[62px] px-[72px] py-[22px] bg-[#2d87f1] rounded-[10px] m-5 text-lg font-semibold"
export const InputBtn_disable = "w-[340px] h-[62px] px-[72px] py-[22px] bg-[#1a2f49] rounded-[10px] m-5 text-lg font-semibold"

export const Container = "flex flex-col gap-10 min-h-screen items-center font-pretendard"

export function Title({ title }: { title: string }) {
    const navigate = useNavigate();
    return <div className="text-center text-white text-lg font-semibold leading-normal pt-8 relative w-[390px]"><Back onClick={() => navigate(-1)} className="absolute left-7 top-9 cursor-pointer" />{title}</div>
}

export function NameChip({ name }: { name: string }) {
    return <div className="h-[30px] px-4 py-0.5 mr-1 bg-[#2d87f1] rounded-[50px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#1d1f23] text-xl font-bold leading-relaxed">{name}</div>
    </div>
}

{/* <div className=" h-8 px-[18px] py-[7px] bg-[#212429] rounded-[50px] justify-start items-center gap-2.5 inline-flex">
            <div className="text-[#d1e3f7] text-sm font-normal leading-[18.20px]">{gide}</div>
        </div> */}

export function HashTag({ text }: { text: string }) {
    return <div className="h-7 px-3 bg-[#1d1f23] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#2d87f1] text-xs font-normal leading-none">#{text}</div>
    </div>
}

export const Card = styled.div`
background-color: rgba(29, 31, 35, 0.80); /* Adjust as needed for a dark background */
box-shadow: 0 0 10px rgba(45, 135, 241, 0.30); /* Subtle shadow */
`

export function Footer() {
    const location = useLocation();
    const pathName = location.pathname;
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center px-14 w-[390px] h-[78px] bg-[#181818] rounded-tl-[20px] rounded-tr-[20px] border-t border-[#3d3f46] fixed bottom-0">
            <div onClick={() => { navigate("/home") }} className="flex flex-col items-center gap-1 cursor-pointer">
                {pathName === "/home" ? <BlueHome /> : <Home />}<div className="text-[#474b50] text-xs font-normal leading-none">홈</div>
            </div>
            <div onClick={() => { navigate("/chat") }} className="flex flex-col items-center gap-1 cursor-pointer">
                <Chat /><div className="text-[#474b50] text-xs font-normal leading-none">채팅</div>
            </div>
            <div onClick={() => { navigate("/myPage") }} className="flex flex-col items-center gap-1 cursor-pointer">
                {pathName === "/myPage" ? <BlueMan /> : <Man />}<div className="text-[#474b50] text-xs font-normal leading-none">마이페이지</div>
            </div>
        </div>
    )
}