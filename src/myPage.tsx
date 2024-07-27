import { StyledContainer } from "./home";
import { Container, Footer, Title } from "./lib/general";
import petImg from "./assets/pet.png"
import me from "./assets/me.png"
import { ReactComponent as RightArrow } from "./assets/blueRightArrow.svg"
import { ReactComponent as Lock } from "./assets/lock.svg"
import { ReactComponent as Exit } from "./assets/exit.svg"
import { useNavigate } from "react-router-dom";

export default function MyPage() {
    const navigate = useNavigate();
    return (
        <StyledContainer className={`${Container} gap-5`}>
            <Title title="마이페이지" />
            <div className="flex justify-start w-[390px] pl-7 pt-5">
                <div className="text-white text-[22px] font-bold leading-7">내 반려동물</div>
            </div>
            <div onClick={() => navigate("/petName-change")} className="cursor-pointer bg-[#1d1f23cc] rounded-lg w-[340px] border border-[#212429;] pt-1 pb-6 px-4 text-white relative">
                <div className="flex items-center m-5 mb-0 gap-5">
                    <img src={petImg} className="" />
                    <div className="flex flex-col">
                        <div className="text-white text-lg font-medium leading-normal">김디오</div>
                        <div className="text-[#8c8c8c] text-xs font-normal leading-none">활발한 사교가</div>
                    </div>
                    <RightArrow className="absolute right-3 top-13" />
                </div>
            </div>
            <div className="w-[340px] h-[60px] pl-5 pr-3.5 py-3.5 bg-[#2d87f1] rounded-[14px] border-2 border-[#2d87f1] justify-between items-center gap-1 inline-flex">
                <div className="flex">
                    <div className="text-white text-base font-bold leading-tight">디오</div>
                    <div className="text-white text-base font-medium leading-tight pl-1">와 대화한 시간</div>
                </div>
                <div className="h-[39px] px-4 py-2 bg-[#1d1f23] rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-lg font-bold font-['Pretendard Variable'] leading-normal">8시간</div>
                </div>
            </div>
            <div className="flex justify-start w-[390px] pl-7">
                <div className="text-white text-[22px] font-bold leading-7">내 정보 관리</div>
            </div>
            <div onClick={() => navigate("/nickName-change")} className="cursor-pointer bg-[#1d1f23cc] rounded-lg w-[340px] border border-[#212429;] pt-1 pb-6 px-4 text-white relative">
                <div className="flex items-center m-5 mb-0 gap-5">
                    <img src={me} className="" />
                    <div className="flex flex-col">
                        <div className="text-white text-lg font-medium leading-normal">닉네임</div>
                        <div className="text-[#8c8c8c] text-xs font-normal leading-none">abcdef@gmail.com</div>
                    </div>
                    <RightArrow className="absolute right-3 top-13" />
                </div>
            </div>
            <div className="w-[340px] h-[58px] pl-[18px] py-3.5 bg-[#212429] rounded-[14px] justify-start items-center gap-3 inline-flex">
                <Lock />
                <button onClick={() => navigate("/password-change")} className="text-[#c7c7c9] text-lg font-medium leading-normal">비밀번호 변경</button>
            </div>
            <div className="w-[340px] h-[60px] pl-[18px] py-3.5 bg-[#212429] rounded-[14px] justify-start items-center gap-3 inline-flex">
                <Exit />
                <button className="text-[#c7c7c9] text-lg font-medium leading-normal">로그아웃</button>
            </div>
            <button className="text-[#c7c7c9] text-[15px] font-normal leading-tight md:mb-28">회원탈퇴</button>
            <Footer />
        </StyledContainer>
    )
}