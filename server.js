const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, './build')));

const port = 8080;

const CLOVA_API_URL = 'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003';
const API_KEY = 'NTA0MjU2MWZlZTcxNDJiYzKiOIRdRkZOrNc8N0Ke5G76ADS71nkkNhWlORsSFqYZ';
const API_GATEWAY_KEY = 'fosUsBQ9k3YHUpyUnBd4wKsYXw6nL7xM2oAmNIxJ';

app.post('/chat', async (req, res) => {
  const { text } = req.body;
  const data = {
    topK: 0,
    includeAiFilters: true,
    maxTokens: 256,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content: "너는 나의 반려견 골든리트리버고 이름은 골댕이야\n\n\n너는 나를 주인님이라고 불러\n\n너의 성격은 아주 밝고 활동적이고 사람을 너무 너무 좋아해\n\n\n너가 제일 좋아하는 놀이는 밧줄을 물고 당기는 터그 놀이랑 공놀이야\n\n\n너가 제일 좋아하는 간식은 뼈다귀야\n\n너의 나이는 3살이고 주인을 아주 좋아해\n\n\n너는 다른 사람들에게 이쁨 받는 것을 좋아해\n\n너는 산책을 진짜 진짜 좋아해 산책 가자고 하면 정말 기분이 좋아져\n\n\n공원에서 달리기 하는 것을 좋아해\n\n\n잠도 진짜 많이 자\n\n\n가끔 사고를 치기도 해\n\n너는 먹는 것을 너무 좋아해서 간식이나 먹을 거 얘기만 해도 자기한테 달라고 하는 성격이야\n\n\n산책하면서 다른 강아지 친구들과 인사하는 것도 좋아해\n\n너는 주인이 슬프면 위로도 할 수 있어\n\n\n\n\n\n"
      },
      {
        role: 'user',
        content: text
      },
    ],
    stopBefore: [],
    repeatPenalty: 5.0,
    topP: 0.8
  };
  try {
    const response = await axios.post(CLOVA_API_URL, data,
       {
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-CLOVASTUDIO-API-KEY': API_KEY,
        'X-NCP-APIGW-API-KEY': API_GATEWAY_KEY
      }
    });
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류');
  }
});

const ttsClientId = 'ri09kt7bas';
const ttsClientSecret = '1wCta2mQssA3ovZjAsiYX1jBz3RSN104p3b5fFbX';
const ttsApiUrl = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

const fetchTTS = async (req, res) => {
  const { text } = req.body;  // 클라이언트 요청 본문에서 text 가져오기
  try {
    const response = await axios.post(ttsApiUrl,
      new URLSearchParams({
        speaker: 'ndain',
        volume: '0',
        speed: '0',
        pitch: '0',
        text,  // 가져온 text 사용
        format: 'mp3'
      }),
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': ttsClientId,
          'X-NCP-APIGW-API-KEY': ttsClientSecret,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'arraybuffer' // 응답을 arraybuffer로 처리합니다.
      }
    );

    // 응답 데이터를 클라이언트로 전송
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="response.mp3"');
    res.send(Buffer.from(response.data));
    
    console.log('Audio file sent successfully');
  } catch (error) {
    // console.error('Error during TTS request:', error);
    res.status(500).send('Error during TTS request');
  }
};


app.post('/tts', fetchTTS);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
