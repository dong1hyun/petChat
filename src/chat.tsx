import { Container } from "./lib/general";

function GideChip({gide}: {gide: string}) {
    return <div className="h-8 px-[18px] py-[7px] bg-[#212429] rounded-[50px] justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#d1e3f7] text-sm font-normal font-['Pretendard Variable'] leading-[18.20px]">오늘 뭐했어?</div>
    </div>
}

export default function Chat() {
    return (
        <div className={Container}>
            <div className="w-[390px] h-20 bg-black fixed"></div>
            <div className="w-[390px] flex flex-col justify-start pl-6 pt-24 gap-7 text-white">
                <div className="text-white text-xl font-medium leading-relaxed">디오와 어떤 대화를 나눠볼까요?</div>
                <div className="flex flex-col">
                    💬일상
                    <GideChip gide="오늘 뭐했어?" />
                </div>
                <div>
                    🍀놀이와 활동
                    
                </div>
                <div>
                    💗애정표현
                    
                </div>
            </div>
        </div>
    )
}