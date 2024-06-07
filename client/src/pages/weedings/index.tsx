import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import WeedingPreview from "../../components/weeding-preview";
import { useGetAllWeedingsQuery } from "../../app/services/weeding";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";
import LoadingScreen from "../../components/loading";
import ServerError from "../../components/error";
import NoData from "../../components/nodata";
import styles from "./index.module.css";

const WeedingsList = () => {
  const { data: weedings, isLoading, isError } = useGetAllWeedingsQuery();
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
  if (!weedings || weedings.length === 0) {
    return <NoData />;
  }

  const weedingsList = weedings.map((item, index) => {
    const isEven = index % 2 === 0;
    let alignItems = windowWidth < 500 ? "center" : "flex-start";
    if (isEven) {
      alignItems = windowWidth < 500 ? "center" : "flex-end";
    }

    return (
      <div className={styles.weedingsContainer} key={item.id}>
        <Link to={{
                pathname: `${PATHS.weedingOne}/${item.id}`
            
            }}>
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
