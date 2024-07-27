import { z } from "zod";
import { Container, InputBtn, Title } from "./lib/general";
import { errorInputBox, ErrorMsg, inputBox } from "./lib/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function PetNameChange() {
    const {register, handleSubmit} = useForm<{petName:string}>();
    const [petNameError, setPetNameError] = useState<string[]>([]);
    const onValid = ({petName}:{petName:string}) => {
        
    }
    return <div className={Container}>
        <Title title="이름 변경" />
        <div className="w-[390px] flex justify-start">
            <div className="text-white text-[26px] font-bold leading-[33.80px] pl-7">반려동물 이름을 입력해주세요</div>
        </div>
        <form id="petNameForm" onSubmit={handleSubmit(onValid)}>
            <input {...register("petName")} onFocus={() => setPetNameError([])} placeholder="이메일을 입력해주세요" className={petNameError[0] ? errorInputBox : inputBox} />
            <ErrorMsg errors={petNameError} />
        </form>
        <div className="flex-grow" />
        <button form="petNameForm" className={InputBtn}>확인</button>
    </div>
}