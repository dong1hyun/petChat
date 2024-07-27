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
    const { register, handleSubmit } = useForm<{ text: string }>();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [responseText, setResponseText] = useState('');

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
                    })
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onTTSClick = async () => {
        try {
            axios.post('/tts', { text: responseText }, {
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
            })
        } catch (error) {
            console.error('Error fetching audio file:', error);
        }
    }
    return (
        <div className={Container}>
            <Title title="채팅" />
            <button onClick={onTTSClick}>tts</button>
            <button onClick={playAudio} className="text-white">재생</button>
            <div className="w-[390px] flex flex-col items-start pl-6 pt-24 gap-7 text-white">
                <div className="text-white text-xl font-medium leading-relaxed">디오와 어떤 대화를 나눠볼까요?</div>
                <div className="flex flex-col gap-3">
                    <div>💬일상</div>
                    <GideChip gide="오늘 뭐했어?" />
                </div>
                <div>
                    🍀놀이와 활동
                </div>
                <div>
                    💗애정표현
                </div>
            </div>
            <div className="flex-grow"></div>
            <form onSubmit={handleSubmit(onValid)}>
                <div className="relative w-[360px]">
                    <input {...register("text")} type="text" placeholder="메시지를 입력해주세요" className="w-[360px] h-[45px] pl-5 pr-1 py-2.5 text-white bg-[#212429] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex mb-8" />
                    <button type="submit" className="text-gray-300 absolute right-2 top-[6px]">
                        <div className="w-8 h-8 px-[11px] py-2.5 bg-[#474b50] rounded-2xl justify-start items-center gap-2.5 inline-flex"><ChatArrow /></div>
                    </button>
                </div>
            </form>
        </div>
    );
}
