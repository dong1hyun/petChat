import { useForm } from "react-hook-form";
import { Container, InputBtn, Title } from "./lib/general";
import { errorInputBox, ErrorMsg, inputBox } from "./lib/input";
import { useState } from "react";
import { z } from "zod";

export default function PasswordChange() {
    const checkPassword = ({ password, confirm_password }: { password: string, confirm_password: string }) => password === confirm_password
    // const passwordSchema = z.string().min(4, "비밀번호는 최소 4자 이상 입력해주세요").refine
    const passwordSchema = z.object({
        password: z
            .string()
            .min(4, "비밀번호는 최소 4자 이상 입력해주세요"),
        confirm_password: z
            .string()
    })
        .refine(
            checkPassword,
            {
                message: "비밀번호가 일치하지 않습니다",
                path: ["confirm_password"]
            },
        );

    const { register, handleSubmit } = useForm<{ password: string, confirm_password: string }>();
    const [passwordError, setPasswordError] = useState<string[]>([]);
    const [password_confirmError, setPassword_fonfirmError] = useState<string[]>([]);
    const onValid = ({ password, confirm_password }: { password: string, confirm_password: string }) => {
        console.log(password, confirm_password)
        const result = passwordSchema.safeParse({password, confirm_password});
        if (result.success) {
        } else {
            console.log(result.error?.flatten().fieldErrors.password)
            setPasswordError(result.error?.flatten().fieldErrors.password ?? []);
            setPassword_fonfirmError(result.error?.flatten().fieldErrors.confirm_password ?? [])
        }
    };
    return <div className={Container}>
        <Title title="비밀번호 변경" />
        <div className="w-[390px] flex justify-start">
            <div className="text-white text-[26px] font-bold leading-[33.80px] pl-7">비밀번호를 입력해주세요</div>
        </div>
        <form id="passwordForm" onSubmit={handleSubmit(onValid)} className="flex flex-col gap-6" >
            <input type="password" {...register("password")} onFocus={() => setPasswordError([])} placeholder="비밀번호를 입력해주세요" className={passwordError[0] ? errorInputBox : inputBox} />
            <ErrorMsg errors={passwordError} />
            <input type="password" {...register("confirm_password")} onFocus={() => setPasswordError([])} placeholder="비밀번호 확인" className={password_confirmError[0] ? errorInputBox : inputBox} />
            <ErrorMsg errors={password_confirmError} />
        </form>
        <div className="flex-grow" />
        <button form="passwordForm" className={InputBtn}>변경하기</button>
    </div>
}