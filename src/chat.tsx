import { Container, NameChip, Title } from "./lib/general";
import { ReactComponent as ChatArrow } from "./assets/chatArrow.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function GideChip({ gide }: { gide: string }) {
    return (
        <div className="inline-flex h-8 px-[18px] py-[7px] bg-[#212429] rounded-[50px] justify-start items-center gap-2.5">
            <div className="text-[#d1e3f7] text-sm font-normal leading-[18.20px]">{gide}</div>
        </div>
    );
}

export default function Chat() {
    const { register, handleSubmit, getValues, watch } = useForm<{ text: string }>();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const playAudio = () => {
        console.log("playAudio", audioUrl);
        if (audioUrl) {
            const audioElement = new Audio(audioUrl);
            audioElement.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    const onValid = async ({ text }: { text: string }) => {
        try {
            setLoading(true);
            axios.post('/chat', { text })
                .then(response => {
                    console.log(response.data.result.message.content);
                    setResponseText(response.data.result.message.content);
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
                        console.log(url);
                        console.log('Audio file fetched successfully');
                        setLoading(false);
                    })
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className={Container}>
            <Title title="채팅" />
            <div className="w-[390px] flex flex-col items-start pl-6 pt-24 gap-7 text-white">
                <div className="text-white text-xl font-medium leading-relaxed">디오와 어떤 대화를 나눠볼까요?</div>
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
            </div>
            <div className="flex-grow"></div>
            {loading ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div> : null}
            <form onSubmit={handleSubmit(onValid)}>
                <div className="relative w-[360px]">
                    <input {...register("text")} type="text" placeholder="메시지를 입력해주세요" className="w-[360px] h-[45px] pl-5 pr-1 py-2.5 text-white bg-[#212429] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex mb-5" />
                    <button type="submit" className="text-gray-300 absolute right-2 top-[6px]">
                        <div className={`w-8 h-8 px-[11px] py-2.5 ${ watch("text") ? "bg-[#2d87f1]" : "bg-[#474b50]"} rounded-2xl justify-start items-center gap-2.5 inline-flex`}><ChatArrow /></div>
                    </button>
                </div>
            </form>
        </div>
    );
}
