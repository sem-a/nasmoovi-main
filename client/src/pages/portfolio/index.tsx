import { useParams } from "react-router-dom";
import { useGetForIdPortfolioQuery } from "../../app/services/portfolio";
import LoadingScreen from "../../components/loading";
import Layout from "../../components/layout";
import { Container } from "../../components/containers";
import { PATHS } from "../../paths";
import PortfolioCard from "../../components/portfolio-card";
import ServerError from "../../components/error";
import NoData from "../../components/nodata";
import { Helmet } from "react-helmet";
import styles from "./index.module.css";
import { useGetInfoWeddingQuery } from "../../app/services/wedding";


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
        return <ServerError />;
    }
    if (!portfolio || portfolio.length === 0) {
        return <NoData />;
    }

    const countCol = 4;
    let col = 0;

    let portfolioList: React.ReactNode[] = [];

    for (let i = 0; i < portfolio.length; i++) {
        const item = portfolio[i];
        col += 1;
        if (col === countCol + 1) {
            col = 1;
        }
        const imgClass =
            item.width > item.height
                ? styles.horizontal
                // : i % 6 === 0
                // ? styles.large
                : styles.small;

        if (imgClass === styles.horizontal) {
            col += 1;
        }
        // if (imgClass == styles.large) {
        //     col += 1;
        // }

        if (col === 5 && imgClass === styles.horizontal) {
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

    return <div className={styles.gallery}>{portfolioList}</div>;
};

const PortfolioPage = () => {

    const { id } = useParams<{ id: string }>();

    const {data: wedding, isLoading, isError} = useGetInfoWeddingQuery(id!);

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        return <ServerError />;
    }
    if (!wedding) {
        return <NoData />;
    }

    return (
        <Layout>
            <Helmet>
                <title>{wedding?.name} | Галерея свадьбы</title>
                <meta name="description" content={wedding.description} />
            </Helmet>
            <Container>
                <PortfolioList />
            </Container>
        </Layout>
    );
};

export default PortfolioPage;
