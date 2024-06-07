import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import WeddingPreview from "../../components/wedding-preview";
import { useGetAllWeddingsQuery } from "../../app/services/wedding";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";
import LoadingScreen from "../../components/loading";
import ServerError from "../../components/error";
import NoData from "../../components/nodata";
import styles from "./index.module.css";

const WeddingsList = () => {
  const { data: weddings, isLoading, isError } = useGetAllWeddingsQuery();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Вызовите обработчик сразу, чтобы установить начальное состояние
    handleResize();
    // Удалите обработчик событий при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    return <ServerError />;
  }
  if (!weddings || weddings.length === 0) {
    return <NoData />;
  }

  const weddingsList = weddings.map((item, index) => {
    const isEven = index % 2 === 0;
    let alignItems = windowWidth < 500 ? "center" : "flex-start";
    if (isEven) {
      alignItems = windowWidth < 500 ? "center" : "flex-end";
    }

    return (
      <div className={styles.weddingsContainer} key={item.id}>
        <Link
          to={{
            pathname: `${PATHS.weddingOne}/${item.id}`,
          }}
        >
          <WeddingPreview
            id={item.id}
            name={item.name}
            alignItems={alignItems}
          />
        </Link>
      </div>
    );
  });

  return <div>{weddingsList}</div>;
};

const WeddingsPage = () => {
  return (
    <Layout>
      <WeddingsList />
    </Layout>
  );
};

export default WeddingsPage;
