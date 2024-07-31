import { useEffect, useState } from "react";
import { Card, Container, Title } from "./lib/general";
import { petType } from "./lib/general";

export default function Character() {
    const [imgSrc, setImgSrc] = useState(require("./assets/3.png"));
    useEffect(() => {
        if (localStorage.getItem("selected")) {
            const selected = JSON.parse(localStorage.getItem("selected")!);
            const result = petType[selected.first][selected.second][selected.third][selected.fourth];
            setImgSrc(require(`./assets/${result}.png`));
        }
    }, [])
    return (
        <div className={Container}>
            <Title title="반려동물 성격카드" />
            <img src={imgSrc} alt="petType" className="mt-5 h-[450px]" />
        </div>
    )
}