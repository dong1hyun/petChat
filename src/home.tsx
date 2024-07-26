import React from "react";
import styled from "styled-components";
import { Card, Container, Footer, HashTag, NameChip, Title } from "./lib/general";
import starImg from "./assets/starImg.png";
import petImg from "./assets/pet.png"
import { ReactComponent as RightArrow } from "./assets/blueRightArrow.svg"

// Styled-components를 사용하여 styled div 정의
export const StyledContainer = styled.div`
  background-image: url(${starImg});
  background-repeat: repeat;
  background-size: 250px;
`;

export default function Home() {
    const smapleChat = [
        {date: "7월 10일", content: "좋아하는 간식에 대해 이야기 나눴어요!"},
        {date: "7월 10일", content: "좋아하는 간식에 대해 이야기 나눴어요!"},
        {date: "7월 10일", content: "좋아하는 간식에 대해 이야기 나눴어요!"}
    ]
    return (
        <StyledContainer className={Container}>
            <Title title="반려동물 성격카드" />
            <div className="flex justify-start w-[390px] pl-7">
                <div className="text-white text-[22px] font-normal leading-7">
                    안녕하세요,<span className="mx-2" />
                    <NameChip name="민휘" />
                    님
                </div>
            </div>
            <Card className="rounded-lg w-[340px] h-[146px] relative">
                <div className="flex items-center m-5 mb-0 gap-5">
                    <img src={petImg} className="" />
                    <div className="flex flex-col">
                        <div className="text-[#8c8c8c] text-xs font-normal leading-none">내 반려동물</div>
                        <div className="text-white text-lg font-medium leading-normal">김디오</div>
                    </div>
                    <RightArrow className="absolute right-3 top-16" />
                </div>
                <div className="flex gap-2 pl-5 pt-3">
                    <HashTag text="사람좋아" />
                    <HashTag text="외향형" />
                    <HashTag text="산책가자" />
                </div>
            </Card>
            <div className="flex justify-start w-[390px] pl-7">
                <div className="text-white text-[22px] font-normal leading-7">
                    <NameChip name="디오" />
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
                <button className="h-[38px] px-[26px] py-2.5 bg-[#c7c7c9] rounded-[50px] justify-start items-center gap-2.5 inline-flex mb-16">
                    <div className="text-[#1d1f23] text-sm font-semibold leading-[18.20px]">반려동물 추가</div>
                </button>
            </div>
            <div className="h-[38px] px-[26px] py-2.5 bg-[#c7c7c9] rounded-[50px] justify-start items-center gap-2.5 inline-flex">
                <div className="text-[#1d1f23] text-sm font-semibold leading-[18.20px]">반려동물 추가</div>
            </div>
            <Footer />
        </StyledContainer>
    );
}
