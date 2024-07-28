import styled from "styled-components"
import { ReactComponent as Kakao } from "./assets/kakao.svg"
import { useNavigate } from "react-router-dom"
import { Container } from "./lib/general";
import {ReactComponent as Logo} from "./assets/logo.svg"

export default function Auth() {
    const navigate = useNavigate();
    return (
        <div className={Container}>
            <div className="flex flex-col items-center flex-grow justify-center">
                <Logo />
            </div>
            <div className="flex flex-col items-center gap-3 mb-8 w-full max-w-[390px] *:justify-center">
                <button disabled className="w-[340px] flex py-5 bg-[#fbe60462] rounded-[10px] relative">
                    <Kakao className="absolute left-4" /><div className="text-center text-[#232222] text-[17px] font-semibold">카카오로 시작하기</div>
                </button>
                <button disabled onClick={() => navigate("/login")} className="w-[340px] px-2.5 py-5 bg-[#2d88f190] rounded-[10px] flex gap-[70px]">
                    <div className="text-center text-[#232222] text-[17px] font-semibold">로그인하기</div>
                </button>
                <button onClick={() => navigate("/create-account")} className="py-3 text-[#c7c7c9] text-sm font-normal leading-[18.20px]">회원가입하기</button>
                <button onClick={() => navigate("/home")} className="py-3 text-[#c7c7c9] text-sm font-normal leading-[18.20px]">게스트로 시작하기</button>
            </div>
        </div>
    )
}
