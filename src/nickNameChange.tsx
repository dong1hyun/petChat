import { z } from "zod";
import { Container, InputBtn, Title } from "./lib/general";
import { errorInputBox, ErrorMsg, inputBox } from "./lib/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function NickNameChange() {
    const nickNameSchema = z.string().min(2, "닉네임은 최소 2자 이상 입력해주세요");
    const {register, handleSubmit} = useForm<{nickName:string}>();
    const [nickNameError, setNickNameError] = useState<string[]>([]);
    const onValid = ({ nickName }: { nickName: string }) => {
        const result = nickNameSchema.safeParse(nickName);
        if(result.success) {
        } else setNickNameError(result.error?.flatten().formErrors)
    }
    return <div className={Container}>
        <Title title="닉네임 변경" />
        <div className="w-[390px] flex justify-start">
            <div className="text-white text-[26px] font-bold leading-[33.80px] pl-7">닉네임을 입력해주세요</div>
        </div>
        <form id="nickNameForm" onSubmit={handleSubmit(onValid)}>
            <input {...register("nickName")} onFocus={() => setNickNameError([])} placeholder="닉네임을 입력해주세요" className={nickNameError[0] ? errorInputBox : inputBox} />
            <ErrorMsg errors={nickNameError} />
        </form>
        <div className="flex-grow" />
        <button form="nickNameForm" className={InputBtn}>확인</button>
    </div>
}