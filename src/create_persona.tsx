import React, { useState } from 'react';
import { Container, Title } from "./lib/general";

const Dropdown = ({ options, selected, setSelected }:any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustom, setIsCustom] = useState(false);
    const [customValue, setCustomValue] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option:any) => {
        if (option === '직접입력') {
            setIsCustom(true);
            setSelected(option);
        } else {
            setIsCustom(false);
            setSelected(option);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="bg-[#2c2d2e] text-white px-4 py-2 rounded"
            >
                {isCustom && customValue ? customValue : selected} <span className="ml-2">&#x25BE;</span>
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-full bg-[#2c2d2e] shadow-lg rounded">
                    {options.map((option:any) => (
                        <a
                            key={option}
                            href="#"
                            className="block px-4 py-2 text-white hover:bg-gray-700"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </a>
                    ))}
                </div>
            )}
            {isCustom && (
                <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className="mt-2 px-4 py-2 bg-[#2c2d2e] text-white rounded border border-gray-500 w-full"
                    placeholder="입력하세요"
                />
            )}
        </div>
    );
};

export default function Create_persona() {
    const petOptions = ["강아지", "고양이", "물고기", "햄스터", "토끼", "직접입력"];
    const [selectedPet, setSelectedPet] = useState("반려동물 중");

    return (
        <div className={Container}>
            <Title title="페르소나 생성" />
            <div className="w-[340px] h-1.5 bg-[#2c2d2e] rounded-[50px] justify-start items-center gap-[5px] inline-flex">
                <span className="bg-[#2d87f1] w-[167px] h-1 rounded-l-lg" />
                <span className="bg-[#2d87f1] w-[167px] h-1 rounded-r-lg" />
            </div>
            <div className="flex flex-col items-start w-[390px] pl-6 gap-4">
                <div className="text-white text-[22px] font-medium leading-7">
                    내 반려동물은 <Dropdown options={petOptions} selected={selectedPet} setSelected={setSelectedPet} /> 이고,
                </div>
                <div className="text-white text-[22px] font-medium leading-7">이름은 이야.</div>
                <div className="text-white text-[22px] font-medium leading-7 py-10">나이는 살 이고, 아이야</div>
                <div className="text-white text-[22px] font-medium leading-7">나를 (이)라고 불러주고,</div>
                <div className="text-white text-[22px] font-medium leading-7">말투를 사용해줘!</div>
            </div>
        </div>
    );
}
