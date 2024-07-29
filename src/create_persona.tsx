import React, { useState } from 'react';
import { Container, InputBtn, Title } from "./lib/general";
import { useForm } from 'react-hook-form';

const inputStyle = "mt-2 px-4 py-2 bg-transparent text-white rounded w-36 text-center border border-neutral-700";
const textStyle = "text-white text-md font-medium leading-7"
const Dropdown = ({options, selected, setSelected}: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustom, setIsCustom] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
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
                className="bg-[#2c2d2e] min-w-[120px] text-white px-4 py-2 rounded z-0"
            >
                {selected} <span className="ml-2">&#x25BE;</span>
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-full bg-[#2c2d2e] shadow-lg rounded">
                    {options.map((option: string) => (
                        <a
                            key={option}
                            href="#"
                            className="block px-4 py-2 text-white hover:bg-gray-700 z-10"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </a>
                    ))}
                </div>
            )}
            {isCustom && (
                <input
                    className={inputStyle}
                    placeholder="반려동물 종"
                />
            )}
        </div>
    );
};

export default function Create_persona() {
    const [selectedPet, setSelectedPet] = useState("반려동물 종");
    const [selectedGender, setSelectedGender] = useState("성별");
    const petOptions = ["강아지", "고양이", "물고기", "햄스터", "토끼", "직접입력"];
    const genderOptions = ["남자", "여자"];
    const { register, handleSubmit } = useForm();
    const onValid = () => {
        
    }

    return (
        <div className={`${Container} flex flex-col min-h-screen`}>
            <Title title="페르소나 생성" />
            <div className="w-[340px] h-1.5 bg-[#2c2d2e] rounded-[50px] justify-start items-center gap-1 inline-flex">
                <span className="bg-[#2d87f1] w-[167px] h-1 rounded-l-lg" />
                <span className="bg-[#2d87f1] w-[167px] h-1 rounded-r-lg" />
            </div>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col items-start w-[390px] pl-6 gap-8 flex-grow">
                <div className={textStyle}>
                    내 반려동물은 <Dropdown options={petOptions} selected={selectedPet} setSelected={setSelectedPet} /> 이고,
                </div>
                <div className={textStyle}>이름은 <input {...register("petName")} placeholder='반려동물 이름' className={inputStyle} /> 이야.</div>
                <div className="flex flex-col gap-2">
                    <div className={textStyle}>나이는 <input {...register("age")} placeholder="숫자" className={inputStyle} /> 살 이고,</div>
                    <div className={textStyle}><Dropdown options={genderOptions} selected={selectedGender} setSelected={setSelectedGender} /> 아이야</div>
                </div>
                <div className={textStyle}>나를 <input {...register("myName")} placeholder="호칭" className={inputStyle} /> (이)라고 불러주고,</div>
                <div className={textStyle}><input {...register("speech")} placeholder='원하는 말투' className={inputStyle} /> 말투를 사용해줘!</div>
            </form>
            <div className='flex-grow' />
            <button className={InputBtn}>다음</button>
        </div>
    );
}
