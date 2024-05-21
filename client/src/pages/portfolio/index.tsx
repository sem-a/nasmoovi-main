import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import { useGetForIdPortfolioQuery } from "../../app/services/portfolio";
import { Container } from "../../components/containers";
import { PATHS } from "../../paths";
import { Portfolio } from "@prisma/client";
import styles from "./index.module.css";
import LoadingScreen from "../../components/loading";

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
    if (!portfolio) {
        return <div>Undefined</div>;
    }

    const countCols = 4;

    const sortedPortfolio = portfolio.slice();

    const isHorizontal = (item: Portfolio) => {
        return item && item.width > item.height;
    };
    const isVertical = (item: Portfolio) => {
        return item && item.width < item.height;
    };
    const swapItems = (arr: Portfolio[], index1: number, index2: number) => {
        const temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        console.log("поменялось");
    };

    const portLenght = sortedPortfolio.length;

    let indexCol = 0;

    for (let currIndex = 0; currIndex < portLenght; currIndex++) {
        indexCol += 1;

        if (indexCol === 5) {
            indexCol = 1;
        }

        const currElement = sortedPortfolio[currIndex];
        const nextElement = sortedPortfolio[currIndex + 1];

        if (
            isHorizontal(currElement) &&
            indexCol === 2 &&
            isHorizontal(nextElement)
        ) {
            for (let k = currIndex + 2; k < sortedPortfolio.length; k++) {
                if (isVertical(sortedPortfolio[k])) {
                    swapItems(sortedPortfolio, currIndex, k);
                    break;
                }
            }
        }
        if (isHorizontal(currElement) && indexCol === 4) {
            for (let k = currIndex; k < sortedPortfolio.length; k++) {
                if (isVertical(sortedPortfolio[k])) {
                    swapItems(sortedPortfolio, currIndex, k);
                    break;
                }
            }
        }

        if (isHorizontal(currElement)) {
            indexCol += 1;
        }
    }

    const portfolioList = sortedPortfolio.map((item, index) => {
        let imgClass =
            item.width > item.height
                ? styles.horizontal
                : index % 6 === 0
                ? styles.large
                : styles.small;
        return (
            <div
                key={item.id}
                className={`${styles.portfolioItem} ${imgClass}`}
            >
                <img src={`${PATHS.URL}${item.imgPath}`} alt={item.id} />
            </div>
        );

        //return <div key={item.id} className={`gallery-item gallery-item-${index % 5}`}><img className={styles.portfolioImg} src={`http://localhost:8000/${item.imgPath}`} alt="Portfolio" /></div>;
    });
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
