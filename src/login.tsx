import { useNavigate } from "react-router-dom"
import { errorInputBox, ErrorMsg, inputBox } from "./lib/input";
import { Container, InputBtn, Title } from "./lib/general";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

interface LoginForm {
    email: string,
    password: string,
}

const LoginSchema = z.object({
    email: z
        .string()
        .email({
            message: "유효한 이메일을 입력해주세요"
        }),
    password: z
        .string()
        .min(4, "비밀번호는 최소 4자 이상 입력해주세요")
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export default function Login() {
    const onValid = (data: LoginForm) => {
        setEmailError([]);
        setPasswordError([]);
        const result = LoginSchema.safeParse(data);
        const error = result.error?.flatten().fieldErrors;  
        console.log(error?.email)  
        if(error) {
            if(error.email) setEmailError(error.email);
            if(error.password) setPasswordError(error.password);
        }
    }
    const [emailError, setEmailError] = useState<string[]>([]);
    const [passwordError, setPasswordError] = useState<string[]>([]);
    const { register, handleSubmit, getValues } = useForm<LoginForm>();
    const navigate = useNavigate();
    return (
        <div className={Container}>
            <Title title="로그인" />
            <form id="login-form" onSubmit={handleSubmit(onValid)}>
                <div className="flex flex-col gap-3">
                    <input {...register("email")} onFocus={() => setEmailError([])} placeholder="이메일을 입력해주세요" className={emailError[0] ? errorInputBox : inputBox} />
                    <ErrorMsg errors={emailError} />
                    <input {...register("password")} onFocus={() => setPasswordError([])} placeholder="비밀번호를 입력해주세요" className={passwordError[0] ? errorInputBox : inputBox} />
                    <ErrorMsg errors={passwordError} />
                </div>
                <div className="flex gap-5 justify-end *:p-2">
                    <button className="text-[#c7c7c9] text-sm font-normal leading-[18.20px]">카카오로 로그인</button>
                    <button onClick={() => navigate("/create-account")} className="text-[#c7c7c9] text-sm font-normal leading-[18.20px]">회원가입하기</button>
                </div>
            </form>
            <div className="flex-grow" />
            <button form="login-form" className={InputBtn}>로그인</button>
        </div>
    )
}