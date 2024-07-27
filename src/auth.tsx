import styled from "styled-components"
import { ReactComponent as Kakao } from "./assets/kakao.svg"
import { useNavigate } from "react-router-dom"
import { Container } from "./lib/general";

export default function Auth() {
    const navigate = useNavigate();
    return (
        <div className={Container}>
            <div className="flex flex-col items-center flex-grow justify-center">
                <div className="w-[114px] h-[114px] px-[21px] py-11 bg-[#3d3f46] rounded-[55px] flex-col justify-center">
                    <div className="text-center text-white text-base font-bold leading-tight">캐릭터구간</div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 mb-8 w-full max-w-[390px] *:justify-center">
                <button className="w-[340px] flex py-5 bg-[#fbe504] rounded-[10px] relative">
                    <Kakao className="absolute left-4" /><div className="text-center text-[#232222] text-[17px] font-semibold">카카오로 시작하기</div>
                </button>
                <button onClick={() => navigate("/login")} className="w-[340px] px-2.5 py-5 bg-[#2d87f1] rounded-[10px] flex gap-[70px]">
                    <div className="text-center text-[#232222] text-[17px] font-semibold">로그인하기</div>
                </button>
                <button onClick={() => navigate("/create-account")} className="py-3 text-[#c7c7c9] text-sm font-normal leading-[18.20px]">회원가입하기</button>
                <button onClick={() => navigate("/home")} className="py-3 text-[#c7c7c9] text-sm font-normal leading-[18.20px]">게스트로 시작하기</button>
            </div>
        </div>
    )
}
