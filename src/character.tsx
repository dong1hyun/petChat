import { Card, Container, Title } from "./lib/general";

export default function Character() {
    return(
    <div className={Container}>
        <Title title="반려동물 성격카드" />
        <Card className="rounded-lg w-[340px] relative">
                <div className="text-center text-white text-[22px] font-bold leading-7 pt-8 pb-">활발한 사교가</div>
        </Card>
    </div>
)}