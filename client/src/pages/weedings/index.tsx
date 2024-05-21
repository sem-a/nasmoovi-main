import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import WeedingPreview from "../../components/weeding-preview";
import { Container } from "../../components/containers";
import { useGetAllWeedingsQuery } from "../../app/services/weeding";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";
import styles from "./index.module.css";
import LoadingScreen from "../../components/loading";

const WeedingsList = () => {
    const { data: weedings, isLoading, isError } = useGetAllWeedingsQuery();
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

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        return <div>Ошибка!</div>;
    }
    if (!weedings) {
        return <div>undefined</div>;
    }

    const weedingsList = weedings.map((item, index) => {
        const isEven = index % 2 === 0;
        let alignItems = windowWidth < 500 ? "center" : "flex-start";
        if (isEven) {
            alignItems = windowWidth < 500 ? "center" : "flex-end";
        }
        return (
            <div className={styles.weedingsContainer} key={item.id}>
                <Link to={`${PATHS.weedingOne}/${item.id}`}>
                    <WeedingPreview
                        id={item.id}
                        name={item.name}
                        alignItems={alignItems}
                    />
                </Link>
            </div>
        );
    });

    return <div>{weedingsList}</div>;
};

const WeedingsPage = () => {
    return (
        <Layout>
            <WeedingsList />
        </Layout>
    );
};

export default WeedingsPage;
