import { Card, Container, Title } from "./lib/general";
import extrovert from "./assets/extrovert.png"

export default function Character() {
    return(
    <div className={Container}>
        <Title title="반려동물 성격카드" />
        <img src={extrovert} className="mt-5" />
    </div>
)}