import { useParams } from "react-router-dom";
import { useGetForIdPortfolioQuery } from "../../app/services/portfolio";
import LoadingScreen from "../../components/loading";
import { Portfolio } from "@prisma/client";
import BusinessCard from "../../components/portfolio-card";
import Layout from "../../components/layout";
import { Container } from "../../components/containers";

import styles from "./index.module.css";
import { PATHS } from "../../paths";
import PortfolioCard from "../../components/portfolio-card";

const PortfolioList = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: portfolio,
        isLoading,
        isError,
    } = useGetForIdPortfolioQuery(id!);

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        return <div>Ошибка!</div>;
    }
    if (!portfolio) {
        return <div>Портфолио undefined</div>;
    }

    const countCol = 4;
    let col = 0;
    let row = 0;

    let portfolioList: React.ReactNode[] = [];

    for (let i = 0; i < portfolio.length; i++) {
        const item = portfolio[i];
        col += 1;
        if (col == countCol + 1) {
            col = 1;
        }
        const imgClass =
            item.width > item.height
                ? styles.horizontal
                // : i % 6 === 0
                // ? styles.large
                : styles.small;

        if (imgClass == styles.horizontal) {
            col += 1;
        }
        // if (imgClass == styles.large) {
        //     col += 1;
        // }

        if (col == 5 && imgClass == styles.horizontal) {
            col = 0;
            portfolioList.push(
                <PortfolioCard key={`portfolio-card-${item.id}`} />
            );
            i--;
            continue;
        }

        portfolioList.push(
            <div
                key={item.id}
                className={`${styles.portfolioItem} ${imgClass}`}
            >
                <img src={`${PATHS.URL}${item.imgPath}`} alt={item.id} />
            </div>
        );
    }

    // const portfolioList = portfolio.map((item, index) => {
    //     col += 1;
    //     if (col == 5) {
    //         col = 1;
    //     }

    //     const imgClass =
    //         item.width > item.height ? styles.horizontal : styles.small;
    //     // : index % 6 === 0
    //     // ? styles.large
    //     // : styles.small;

    //     if (imgClass == styles.horizontal || imgClass == styles.large) {
    //         col += 1;
    //     }

    //     if (col == 5 && item.width > item.height) {
    //         col = 0;
    //         return <PortfolioCard key={item.id} />;
    //     }

    //     return (
    //         <div
    //             key={item.id}
    //             className={`${styles.portfolioItem} ${imgClass}`}
    //         >
    //             <img src={`${PATHS.URL}${item.imgPath}`} alt={item.id} />
    //         </div>
    //     );
    // });

    return <div className={styles.gallery}>{portfolioList}</div>;
};

const PortfolioPage = () => {
    return (
        <Layout>
            <Container>
                <PortfolioList />
            </Container>
        </Layout>
    );
};

export default PortfolioPage;
