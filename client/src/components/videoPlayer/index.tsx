import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { H4 } from "../title";
import styles from "./index.module.css";
import { PATHS } from "../../paths";

interface VideoPlayerProps {
    title: string; // Название видео
    url: string; // Путь к видео
    alignItems: string;
}
type playerWidthType = string | number | undefined;

type textAlignType = "end" | "center" | "start" | "left" | "right" | "justify" | "match-parent" | undefined

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    title,
    url,
    alignItems,
}) => {
    // Создаем ссылку на контейнер видеоплеера
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [playerWidth, setPlayerWidth] = useState<playerWidthType>();

    useEffect(() => {
        const windowWidth = window.innerWidth;

        if (windowWidth < 740) {
            setPlayerWidth("500px");
        }
        if (windowWidth < 600) {
            setPlayerWidth("400px")
        }
        if (windowWidth < 450) {
            setPlayerWidth("300px")
        }

        // Типизация для параметра entries в observerCallback
        const observerCallback: IntersectionObserverCallback = (entries) => {
            const player = playerContainerRef.current?.querySelector("video");
            if (!player) return;

            const entry = entries[0]; // У нас только один элемент, поэтому берем первый
            // Воспроизводим или ставим на паузу видео
            if (entry.isIntersecting) {
                player.play();
            } else {
                player.pause();
            }
        };

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );
        if (playerContainerRef.current) {
            observer.observe(playerContainerRef.current); // Наблюдаем за контейнером плеера
        }

        return () => {
            observer.disconnect(); // Отключаемся при размонтировании компонента
        };
    }, [window.innerWidth]);

    return (
        <div
            ref={playerContainerRef}
            className={styles.videoPlayer}
            style={{ alignItems }}
        >
            <ReactPlayer
                url={`${PATHS.URL}${url}`}
                controls
                muted={true}
                width={playerWidth}
            />
            <div className={styles.videoName}>
                <H4 textAlign='end'>{title}</H4>
            </div>
        </div>
    );
};

export default VideoPlayer;
