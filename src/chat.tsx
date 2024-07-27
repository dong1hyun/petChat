import { Container, NameChip, Title } from "./lib/general";
import { ReactComponent as ChatArrow } from "./assets/chatArrow.svg"
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
    const { register, handleSubmit } = useForm<{text: string}>();
    const [audioUrl, setAudioUrl] = useState('');
    const tts = async (text: string) => {
        console.log(text);
        const client_id = 'nkfix7qnvk';
        const client_secret = 'EkQo6PyGSZgQx2tqthWhMYLwzaDsJB8vpgeGv9SE';
        const api_url = 'https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';
    
        const fetchTTS = async () => {
            try {
                const response = await axios.post(api_url,
                    new URLSearchParams({
                        speaker: 'nara',
                        volume: '0',
                        speed: '0',
                        pitch: '0',
                        text,
                        format: 'mp3'
                    }),
                    {
                        headers: {
                            'X-NCP-APIGW-API-KEY-ID': client_id,
                            'X-NCP-APIGW-API-KEY': client_secret,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'blob' // 응답을 Blob으로 처리합니다.
                    }
                );
    
                // Blob을 URL로 변환하여 상태에 설정
                const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
    
                console.log('Audio file fetched successfully');
            } catch (error) {
                console.error('Error during TTS request:', error);
            }
        };

        await fetchTTS();
    }
    const playAudio = () => {
        console.log("playAudio", audioUrl);
        if (audioUrl) {
            const audioElement = new Audio(audioUrl);
            audioElement.play();
        }
    };
    const onValid = ({text}: {text: string}) => {
        tts(text);
    }
    return (
        <div className={Container}>
            <Title title="채팅" />
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
                <div className="w-[360px] h-[45px] pl-5 pr-1 py-2.5 bg-[#212429] rounded-[50px] border border-[#2d87f1] justify-center items-center gap-2.5 inline-flex mb-8">
                    <input {...register("text")} type="text" placeholder="메시지를 입력해주세요" className="flex-grow bg-transparent border-none outline-none text-gray-300 placeholder-gray-500" />
                    <button className="text-gray-300">
                        <div className="w-8 h-8 px-[11px] py-2.5 bg-[#474b50] rounded-2xl justify-start items-center gap-2.5 inline-flex"><ChatArrow /></div>
                    </button>
                </div>
            </form>
        </div>
    );
}