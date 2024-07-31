import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Container, Footer, HashTag, NameChip, Title } from "./lib/general";
import starImg from "./assets/starImg.png";
import { ReactComponent as RightArrow } from "./assets/blueRightArrow.svg"
import { useNavigate } from "react-router-dom";

// Styled-components를 사용하여 styled div 정의
export const StyledContainer = styled.div`
  background-image: url(${starImg});
  background-repeat: repeat;
  background-size: 250px;
`;

export default function Home() {
    const [petName, setPetName] = useState("골댕이");
    const [petImg, setPetImg] = useState(require("./assets/dog.jpg"));
    
    const navigate = useNavigate();
    const smapleChat = [
        {date: "1월 1일", content: "게스트 대화는 저장이 안돼요!"},
        {date: "1월 1일", content: "좋아하는 간식에 대해 이야기 나눠보세요!"},
    ]
    const setImg = (pet: string) => {
        setPetImg(require(`./assets/${pet}.jpg`));
    }
    useEffect(() => {
        if(localStorage.getItem("custom")){
            const custom = JSON.parse(localStorage.getItem("custom")!);
            const selected = JSON.parse(localStorage.getItem("selected")!);
            setPetName(custom.petName);
            if(custom.pet === "고양이") setImg("cat");
            else if(custom.pet === "앵무새") setImg("parrot");
            else if(custom.pet === "햄스터") setImg("hamster");
            else if(custom.pet === "토끼") setImg("rabbit");
        }
    })
    return (
        <StyledContainer className={Container}>
            <Title title="반려동물 성격카드" />
            <div className="flex justify-start w-[390px] pl-7">
                <div className="text-white text-[22px] font-normal leading-7">
                    안녕하세요,<span className="mx-2" />
                    <NameChip name="게스트" />
                    님
                </div>
            </div>
            <Card onClick={() => navigate("/home/character")} className="rounded-lg w-[340px] h-[146px] relative cursor-pointer">
                <div className="flex items-center m-5 mb-0 gap-5">
                    <img src={petImg} className="w-14 h-14 rounded-md" />
                    <div className="flex flex-col">
                        <div className="text-[#8c8c8c] text-xs font-normal leading-none">내 반려동물</div>
                        <div className="text-white text-lg font-medium leading-normal">{petName}</div>
                    </div>
                    <RightArrow className="absolute right-3 top-16 cursor-pointer" />
                </div>
                <div className="flex gap-2 pl-5 pt-3">
                    <HashTag text="사람좋아" />
                    <HashTag text="외향형" />
                    <HashTag text="산책가자" />
                </div>
            </Card>
            <div className="flex justify-start w-[390px] pl-7">
                <div className="text-white text-[22px] font-normal leading-7">
                    <NameChip name={petName} />
                    와 나눈 대화
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="bg-[#1d1f23cc] rounded-lg w-[340px] border border-[#212429;] pt-3 pb-6 px-4 text-white">
                    {smapleChat.map((chat, i) => (
                        <div key={i}>
                            <div className="text-[#8c8c8c] text-xs font-normal leading-none p-3 pl-1">{chat.date}</div>
                            <div className="w-[296px] h-[50px] pl-[18px] py-[15px] bg-[#212429] rounded-[10px] justify-start items-center gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal leading-[18.20px]">{chat.content}</div>
                            </div>
                        </div>
                    ))}
                    <div className="text-right text-[#d1e3f7] text-xs font-normal leading-none pt-3 pr-3">대화기록은 매월 1일마다 초기화돼요!</div>
                </div>
                <button onClick={() => navigate("/create-persona")} className="h-[38px] px-[26px] py-2.5 bg-[#c7c7c9] rounded-[50px] justify-start items-center gap-2.5 inline-flex mb-32">
                    <div className="text-[#1d1f23] text-sm font-semibold leading-[18.20px]">반려동물 생성</div>
                </button>
            </div>
            <Footer />
        </StyledContainer>
    );
}
