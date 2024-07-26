import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { errorInputBox, ErrorMsg, inputBox } from "./lib/input"
import { Container, InputBtn, Title } from "./lib/general"
import { useState } from "react"

const checknickName = async () => {
  // 닉네임 검증 로직
}

const checkEmail = async () => {
  // 이메일 검증 로직
}

interface AccountForm {
  nickName: string
  email: string,
  password: string,
}

export default function Create_account() {
  const nickNameSchema = z.string().min(2, "닉네임은 최소 2자 이상 입력해주세요");
  const emailSchema = z.string().email({message: "유효한 이메일을 입력해주세요"});
  const passwordSchema = z.string().min(4, "비밀번호는 최소 4자 이상 입력해주세요");
  const onValid = (data: AccountForm) => {
    if(ShowNickName) {
      const result = nickNameSchema.safeParse(data.nickName);
      if(result.success) {
        setNickName(result.data);
        setShowNickName(false);
        setShowEmail(true);
      } else setNickNameError(result.error?.flatten().formErrors)
    }
    if(showEmail) {
      const result = emailSchema.safeParse(data.email);
      if(result.success) {
        setEmail(result.data);
        setShowEmail(false);
        setShowPassword(true);
      } else {setEmailError(result.error?.flatten().formErrors); console.log(result.error?.flatten().formErrors[0])}
    }
    if(showPassword) {
      const result = passwordSchema.safeParse(data.password);
      if(result.success) {
        setShowPassword(false);
        setShowPassword(true);
        console.log(nickName, email, result.data)
      } else setPasswordError(result.error?.flatten().formErrors)
    }
  }
  const [ShowNickName, setShowNickName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [nickNameError, setNickNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);
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
          <input {...register("nickName")} required placeholder="닉네임을 입력해주세요" onFocus={() => setNickNameError([])} className={nickNameError[0] ? errorInputBox : inputBox} /></> : null}
          <ErrorMsg errors={nickNameError} />
        {showEmail ? <><div className="text-white text-base font-medium leading-tight">이메일</div>
        <input {...register("email")} required placeholder="이메일" onFocus={() => setEmailError([])} className={emailError[0] ? errorInputBox : inputBox} /></>  : null}
        <ErrorMsg errors={emailError} />
        {showPassword ? <><div className="text-white text-base font-medium leading-tight">비밀번호</div>
        <input {...register("password")} required placeholder="비밀번호" type="password" onFocus={() => setPasswordError([])} className={passwordError[0] ? errorInputBox : inputBox} /></>  : null}
        <ErrorMsg errors={passwordError} />
      </form>
      <div className="flex-grow" />
      <button form="create-account-form" type="submit" className={InputBtn}>{showPassword ? "회원가입하기" : "다음"}</button>
    </div>
  );
}