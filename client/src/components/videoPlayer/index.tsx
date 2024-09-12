import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { H4 } from "../title";
import styles from "./index.module.css";
import { PATHS } from "../../paths";

interface VideoPlayerProps {
    title: string; 
    url: string;
    alignItems: string;
}
type playerWidthType = string | number | undefined;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    title,
    url,
    alignItems,
}) => {
    
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [playerWidth, setPlayerWidth] = useState<playerWidthType>();
    const [playerHeight, setPlayerHeight] = useState<playerWidthType>();

    useEffect(() => {
        const windowWidth = window.innerWidth;

        if (windowWidth < 740) {
            setPlayerWidth("640px");
            setPlayerHeight("360px");
        }
        if (windowWidth < 660) {
            setPlayerWidth("427px")
            setPlayerHeight("240px")
        }
        if (windowWidth < 450) {
            setPlayerWidth("320px")
            setPlayerHeight("180px")
        }
        const observerCallback: IntersectionObserverCallback = (entries) => {
            const player = playerContainerRef.current?.querySelector("video");
            if (!player) return;

            const entry = entries[0];
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
            observer.observe(playerContainerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={playerContainerRef}
            className={styles.videoPlayer}
            style={{ alignItems }}
        >
            <ReactPlayer
                url={`${url}`}
                controls
                muted={true}
                width={playerWidth}
                height={playerHeight}
            />
            <div className={styles.videoName}>
                <H4 textAlign='end'>{title}</H4>
            </div>
        </div>
    );
};

export default VideoPlayer;
