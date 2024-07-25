import React from "react";
import styled from "styled-components";
import { Container, HashTag, NameChip, Title } from "./lib/general";
import starImg from "./assets/starImg.png";
import petImg from "./assets/pet.png"
import { ReactComponent as RightArrow } from "./assets/blueRightArrow.svg"

// Styled-components를 사용하여 styled div 정의
const StyledContainer = styled.div`
  background-image: url(${starImg});
  background-repeat: repeat;
  background-size: 250px;
`;

const Card = styled.div`
background-color: rgba(29, 31, 35, 0.80); /* Adjust as needed for a dark background */
box-shadow: 0 0 10px rgba(45, 135, 241, 0.30); /* Subtle shadow */
`

export default function MyPage() {
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
        </StyledContainer>
    );
}
