import { Container, InputBtn, Title } from "./lib/general";
import { inputBox } from "./lib/input";

export default function NickNameChange() {
    return <div className={Container}>
        <Title title="닉네임 변경" />
        <div className="w-[390px] flex justify-start">
            <div className="text-white text-[26px] font-bold leading-[33.80px] pl-7">닉네임을 입력해주세요</div>
        </div>
        <input placeholder="변경할 닉네임을 입력해주세요" className={inputBox} />
        <div className="flex-grow" />
        <button className={InputBtn}>확인</button>
    </div>
}