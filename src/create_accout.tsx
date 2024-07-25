import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { inputBox } from "./lib/input"
import { Container, InputBtn, Title } from "./lib/general"
import { useState } from "react"

const checknickName = async () => {
  // 닉네임 검증 로직
}

const checkEmail = async () => {
  // 이메일 검증 로직
}

const LoginSchema = z.object({
  nickName: z
    .string()
    .trim()
    .min(3)
    .max(10)
    .refine(checknickName, "This username is already taken"),
  email: z
    .string()
    .email()
    .refine(checkEmail, "There is an account already registered with that email"),
  password: z
    .string()
    .min(4)
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})

interface AccountForm {
  nickName: string
  email: string,
  password: string,
}

export default function Create_account() {
  const onValid = (data: AccountForm) => {
    console.log(data)
  }
  const [ShowNickName, setShowNickName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<AccountForm>();
  return (
    <div className={Container}>
      <Title title="회원가입" />
      <div className="w-[340px] h-1.5 bg-[#2c2d2e] rounded-[50px] justify-start items-center gap-[5px] inline-flex">
        {ShowNickName || showEmail || showPassword ?<span className="bg-[#2d87f1] w-[110px] h-1 rounded-l-lg" /> : null}
        {showEmail || showPassword ? <span className="bg-[#2d87f1] w-[110px] h-1" /> : null}
        {showPassword ? <span className="bg-[#2d87f1] w-[110px] h-1 rounded-r-lg" /> : null}
      </div>
      <div className="flex justify-start w-[390px] pl-7">
        <div className="text-white text-[26px] font-bold leading-[33.80px]">간단한 정보를 입력해주세요</div>
      </div>
      <form id="create-account-form" onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
        {ShowNickName ? <><div className="text-white text-base font-medium leading-tight">닉네임</div>
          <input {...register("nickName")} placeholder="닉네임을 입력해주세요" className={inputBox} /></> : null}
        {showEmail ? <><div className="text-white text-base font-medium leading-tight">이메일</div>
        <input {...register("email")} placeholder="이메일" className={inputBox} /></>  : null}
        {showPassword ? <><div className="text-white text-base font-medium leading-tight">비밀번호</div>
        <input {...register("password")} placeholder="비밀번호" className={inputBox} /></>  : null}
      </form>
      <div className="flex-grow" />
      <button form="create-account-form" type="submit" className={InputBtn}>완료</button>
    </div>
  );
}
