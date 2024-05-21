import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
    children: React.ReactNode;
    textAlign?:
        | "start"
        | "end"
        | "left"
        | "right"
        | "center"
        | "justify"
        | "match-parent";
    color?: string;
};

export const H2: React.FC<Props> = ({
    children,
    textAlign = "start",
    color = "#776F60",
}) => {
    return (
        <h2
            style={{ textAlign: textAlign, color: color }}
            className={styles.title}
        >
            {children}
        </h2>
    );
};

export const H3: React.FC<Props> = ({
    children,
    textAlign = "start",
    color = "white",
}) => {
    return (
        <h3
            style={{ textAlign: textAlign, color: color }}
            className={styles.title}
        >
            {children}
        </h3>
    );
};

export const H4: React.FC<Props> = ({
    children,
    textAlign = "start",
    color = "#776F60",
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        // Вызовите обработчик сразу, чтобы установить начальное состояние
        handleResize();
        // Удалите обработчик событий при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    textAlign = windowWidth < 500 ? "center" : textAlign;

    return (
        <h4
            style={{ textAlign: textAlign, color: color }}
            className={styles.title}
        >
            {children}
        </h4>
    );
};
