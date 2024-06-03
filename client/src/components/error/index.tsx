import React from "react";
import Layout from "../../components/layout";
import { H2 } from "../../components/title";
import styles from "./index.module.css";

const ServerError: React.FC = () => {
  return (
    <div className={styles.errorPage}>
      <H2>500 - Ошибка сервера</H2>
      <p>Произошла ошибка на сервере. Пожалуйста, попробуйте позже.</p>
    </div>
  );
};

export default ServerError;
