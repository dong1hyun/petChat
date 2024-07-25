import { useState } from "react"
import { ReactComponent as Check } from "./assets/check.svg"
import { ReactComponent as GrayCheck } from "./assets/check2.svg"
import { ReactComponent as BlueCheck } from "./assets/blueCheck.svg"
import { ReactComponent as  Arrow } from "./assets/rightArrow.svg"
import { Container, InputBtn, InputBtn_disable } from "./lib/general"


export default function Agreement() {
    const [allAgree, setAllAgree] = useState(false);
    const [agree, setAgree] = useState(false);
    const [agree2, setAgree2] = useState(false);

    const onAllAgreeClick = () => {
        if(allAgree) {
            setAllAgree(false);
            setAgree(false);
            setAgree2(false);
        } else {
            setAllAgree(true);
            setAgree(true);
            setAgree2(true);
        }
    }

    const onAgreeClick = () => {setAgree(cur => !cur)}
    const onAgreeClick2 = () => {setAgree2(cur => !cur)}
    return (
        <div className={Container}>
            <div className="w-[340px] flex items-start mt-[90px]">
                <div className="w-[114px] h-[114px] px-[21px] py-11 bg-[#3d3f46] rounded-[55px] flex-col justify-center items-start gap-2.5 inline-flex">
                    <div className="text-center text-white text-base font-bold font-['Pretendard Variable'] leading-tight">캐릭터구간</div>
                </div>
            </div>
            <div className="flex flex-col items-start gap-[14px] w-[340px]">
                <div className="text-left text-white text-3xl font-bold leading-[39px]">
                    내 반려동물과<br />대화 시작하기
                </div>
                <div className="text-left text-neutral-400 text-[15px] font-normal leading-snug">
                    대화를 위해 약관에 동의해주세요.
                </div>
            </div>
            <div className="flex-grow" />
            <div className="flex flex-col gap-[14px] w-[340px]">
                <div className="flex gap-[14px] items-center border-b border-[#2c2d2e] pb-3">
                    <div onClick={onAllAgreeClick} className={`w-[30px] h-[30px] px-[9px] py-[11px] ${allAgree ? "bg-[#2d87f1]" : "bg-neutral-600"} rounded-[15px] flex justify-center items-center cursor-pointer`}>
                        <Check className="w-6 h-6" />
                    </div>
                    <div className="text-white text-xl font-bold leading-relaxed">
                        전체 동의하기
                    </div>
                </div>
                <div className="flex flex-col gap">
                    <div className="flex gap-[22px] py-[4px] items-center text-neutral-400 text-[15px] font-normal leading-tight pl-2">
                        {agree ? <BlueCheck className="cursor-pointer" onClick={onAgreeClick} /> : <GrayCheck onClick={onAgreeClick} className="cursor-pointer" />}(필수) 서비스 이용 약관 동의<div className="flex-grow" /><Arrow className="size-3" />
                    </div>
                    <div className="flex gap-[22px] py-[4px] items-center text-neutral-400 text-[15px] font-normal leading-tight pl-2">
                        {agree2 ? <BlueCheck className="cursor-pointer" onClick={onAgreeClick2} /> : <GrayCheck onClick={onAgreeClick2} className="cursor-pointer" />}(필수) 개인 정보 수집 및 이용 동의<div className="flex-grow" /><Arrow className="size-3" />
                    </div>
                </div>
            </div>
            <button className={agree && agree2 ? InputBtn : InputBtn_disable}>다음</button>
        </div>
    )
}
