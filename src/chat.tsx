import { Container, NameChip, Title } from "./lib/general";
import { ReactComponent as ChatArrow } from "./assets/chatArrow.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Logo } from "./assets/logo.svg"

function GideChip({ gide }: { gide: string }) {
    return (
        <div className="inline-flex h-8 px-[18px] py-[7px] bg-[#212429] rounded-[50px] justify-start items-center gap-2.5">
            <div className="text-[#d1e3f7] text-sm font-normal leading-[18.20px]">{gide}</div>
        </div>
    );
}

export default function Chat() {
    const { register, handleSubmit, watch, reset } = useForm<{ text: string }>();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [myCaht, setMychat] = useState("");
    const [petChat, setPetChat] = useState("");
    const [petImg, setPetImg] = useState(require("./assets/dog.jpg"));
    const setImg = (pet: string) => {
        console.log(`./assets/${pet}.jpg`)
        setPetImg(require(`./assets/${pet}.jpg`));
    }
    useEffect(() => {
        if(localStorage.getItem("custom")){
            const custom = JSON.parse(localStorage.getItem("custom")!);
            const selected = JSON.parse(localStorage.getItem("selected")!);
            if(custom.pet === "고양이") setImg("cat");
            else if(custom.pet === "앵무새") setImg("parrot");
            else if(custom.pet === "햄스터") setImg("hamster");
            else if(custom.pet === "토끼") setImg("rabbit");
        }
    })
    const playAudio = () => {
        // console.log("playAudio", audioUrl);
        if (audioUrl) {
            const audioElement = new Audio(audioUrl);
            audioElement.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    const onValid = async ({ text }: { text: string }) => {
        try {
            reset()
            setLoading(true);
            setMychat(text);
            axios.post('/chat', { text })
                .then(response => {
                    // console.log(response.data.result.message.content);
                    setPetChat(response.data.result.message.content);
                    axios.post('/tts', { text: response.data.result.message.content }, {
                        responseType: 'blob' // 응답을 Blob으로 처리합니다.
                    })
                        .then(response => {
                            const url = URL.createObjectURL(response.data);
                            const audioElement = new Audio(url);
                            audioElement.play().catch(error => {
                                console.error("Error playing audio:", error);
                            });
                            setAudioUrl(url);
                            // console.log(url);
                            // console.log('Audio file fetched successfully');
                            setLoading(false);
                        })
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className={`${Container} relative`}>
            <Title title="채팅" />
            {myCaht ? <div className="flex flex-col gap-5 w-[390px] pl-5 pr-5 items-end">
                <div className="pl-[30px] pr-[30px] py-5 bg-black/10 rounded-tl-[14px] rounded-tr-sm rounded-bl-[14px] rounded-br-[14px] border border-[#2c2d2e] justify-start items-center gap-2.5 inline-flex">
                    <div className="text-right text-white text-base font-normal leading-tight break-words">{myCaht}</div>
                </div>
            </div> : <div className="w-[390px] flex flex-col items-start pl-6 gap-7 text-white">
                <div className="text-white text-xl font-medium leading-relaxed">
                    <div className="flex items-center">
                        <Logo className="size-10" />
                        <div className="text-white text-[32px] font-normal font-['SB AggroOTF'] leading-[41.60px]">PET-PAL</div>
                    </div>
                    골댕이와 어떤 대화를 나눠볼까요?
                </div>
                <div className="text-neutral-500 text-sm font-medium leading-relaxed">(게스트는 대화 저장이 안돼요 ㅜㅜ)</div>
                <div className="flex flex-col gap-3">
                    💬일상
                    <div className="flex gap-3">
                        <GideChip gide="오늘 뭐했어?" />
                        <GideChip gide="오늘 언제 기분 좋았어?" />
                    </div>
                </div>
                <div>
                    🍀놀이와 활동
                    <div className="flex gap-3">
                        <GideChip gide="산책 갈까?" />
                        <GideChip gide="어떤 장난감을 좋아해?" />
                    </div>
                </div>
                <div>
                    💗애정표현
                    <div className="flex gap-3">
                        <GideChip gide="항상 내 곁에 있어줘서 고마워!" />
                        <GideChip gide="사랑해" />
                    </div>
                </div>
            </div>}
            {
                petChat ? <div className="flex flex-col gap-5 w-[390px] pl-5 pr-5 items-start">
                    <div>
                        <img src={petImg} className="w-9 h-9 rounded-full" />
                        <div className="pl-[30px] pr-[30px] py-5 bg-[#212429] rounded-tl-sm rounded-tr-[14px] rounded-bl-[14px] rounded-br-[14px] justify-start items-center gap-2.5 inline-flex">
                            <div className="text-white text-base font-normal leading-tight break-words">{petChat}</div>
                        </div>
                    </div>
                </div> : null
            }
            <div className="flex-grow"></div>
            {loading ? <div className="absolute bottom-24 animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-blue-500"></div> : null}
            <form onSubmit={handleSubmit(onValid)}>
                <div className={`relative w-[360px] ${loading ? "opacity-50" : null}`}>
                    <input {...register("text")} type="text" placeholder="메시지를 입력해주세요" className="w-[360px] h-[45px] pl-5 pr-1 py-2.5 text-white bg-[#212429] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex mb-5" />
                    <button disabled={loading} type="submit" className="text-gray-300 absolute right-2 top-[6px]">
                        <div className={`w-8 h-8 px-[11px] py-2.5 ${watch("text") ? "bg-[#2d87f1]" : "bg-[#474b50]"} rounded-2xl justify-start items-center gap-2.5 inline-flex`}><ChatArrow /></div>
                    </button>
                </div>
            </form>
        </div>
    );
}
