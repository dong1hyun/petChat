import React, { Dispatch, SetStateAction, useState } from 'react';
import { Container, InputBtn, Title } from "./lib/general";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const inputStyle = "mt-2 px-3 py-2 bg-transparent text-white rounded w-36 text-center border border-neutral-700";
const textStyle = "text-white text-lg font-medium leading-7"

interface dropdownProps {
    options: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ options, selected, setSelected }: dropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelected(option)
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div
                onClick={toggleDropdown}
                className="bg-[#2c2d2e] min-w-[120px] text-white px-4 py-2 rounded cursor-pointer"
            >
                {selected} <span className="ml-2">&#x25BE;</span>
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-full bg-[#2c2d2e] shadow-lg rounded z-10">
                    {options.map((option: string) => (
                        <span
                            key={option}
                            className="block px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

interface CardProps {
    option: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const Card = ({ option, selected, setSelected }: CardProps) => {
    return <button onClick={() => setSelected(option)} className={`text-center w-[164px] h-[51px] px-7 py-[15px] rounded-lg text-base font-medium leading-tight 
        ${selected === option ? "bg-[#181818] text-[#2d87f1]" : "bg-[#25292e] text-[#8c8c8c]"}`}>
        {option}
    </button>
}

interface inputForm {
    petName: string,
    age: number,
    myName: string,
    speech: string
}

export default function Create_persona() {
    const [selectedPet, setSelectedPet] = useState("반려동물 종");
    const [selectedGender, setSelectedGender] = useState("성별");
    const [next, setNext] = useState(false);
    const petOptions = ["강아지", "고양이", "앵무새", "햄스터", "토끼"];
    const genderOptions = ["남자", "여자"];
    const { register, handleSubmit } = useForm<inputForm>();
    const navigate = useNavigate();
    const onValid = (data: inputForm) => {
        if(selectedPet === "반려동물 종") alert("반려동물 종을 선택해주세요");
        else if(selectedGender === "성별") alert("성별을 선택해주세요");
        else {
            // console.log(data);
            // console.log(selectedPet, selectedGender);
            const result = {...data, pet: selectedPet, gender: selectedGender};
            
            localStorage.setItem("custom", JSON.stringify(result));
            setNext(true);
        }
    }
    const onValid2 = () => {
        const selected = {
            first,
            second,
            third,
            fourth
        }
        localStorage.setItem("selected", JSON.stringify(selected));
        navigate("/home/character");
    }
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [fourth, setFourth] = useState("");

    return (
        <div className={`${Container} flex flex-col min-h-screen`}>
            <Title title="페르소나 생성" />
            <div className="w-[340px] h-1.5 bg-[#2c2d2e] rounded-[50px] justify-between items-center gap-1 inline-flex">
                <span className="bg-[#2d87f1] w-[167px] h-1 rounded-l-lg" />
                {next ? <span className="bg-[#2d87f1] w-[167px] h-1 rounded-r-lg" /> : null}
            </div>
            {next ?
                <>
                    <div className='flex flex-col items-start w-[390px] pl-6 gap-8'>
                        <div className={textStyle}>
                            내 반려동물은
                            <div className='flex gap-3 pt-3'>
                                <Card option='외향적이다' selected={first} setSelected={setFirst} />
                                <Card option='내향적이다' selected={first} setSelected={setFirst} />
                            </div>
                        </div>
                        <div className={textStyle}>
                            평소에
                            <div className='flex gap-3 pt-3'>
                                <Card option='많이 움직인다' selected={second} setSelected={setSecond} />
                                <Card option='적게 움직인다' selected={second} setSelected={setSecond} />
                            </div>
                        </div>
                        <div className={textStyle}>
                            말은
                            <div className='flex gap-3 pt-3'>
                                <Card option='많은 편이다' selected={third} setSelected={setThird} />
                                <Card option='적은 편이다' selected={third} setSelected={setThird} />
                            </div>
                        </div>
                        <div className={textStyle}>
                            내가 집에 돌아오면
                            <div className='flex gap-3 pt-3'>
                                <Card option='반겨준다' selected={fourth} setSelected={setFourth} />
                                <Card option='안 반겨준다' selected={fourth} setSelected={setFourth} />
                            </div>
                        </div>
                    </div>
                    <div className='flex-grow' />
                    <button onClick={() => onValid2()} className={InputBtn}>결과보기</button>
                </>
                : <>
                    <form id='personaForm' onSubmit={handleSubmit(onValid)} className="flex flex-col items-start w-[390px] pl-6 gap-8">
                        <div className={textStyle}>
                            내 반려동물은 <Dropdown options={petOptions} selected={selectedPet} setSelected={setSelectedPet} /> 이고,
                        </div>
                        <div className={textStyle}>이름은 <input required {...register("petName")} placeholder='반려동물 이름' className={inputStyle} /> 이야.</div>
                        <div className="flex flex-col gap-2">
                            <div className={textStyle}>나이는 <input required {...register("age")} type='number' placeholder="숫자" className={inputStyle} /> 살 이고,</div>
                            <div className={textStyle}><Dropdown options={genderOptions} selected={selectedGender} setSelected={setSelectedGender} /> 아이야</div>
                        </div>
                        <div className={textStyle}>나를 <input required {...register("myName")} placeholder="호칭" className={inputStyle} /> (이)라고 불러주고,</div>
                        <div className={textStyle}><input required {...register("speech")} placeholder='원하는 말투' className={inputStyle} /> 말투를 사용해줘!</div>
                    </form>
                    <div className='flex-grow' />
                    <button form='personaForm' className={InputBtn}>다음</button>
                </>}
        </div>
    );
}
