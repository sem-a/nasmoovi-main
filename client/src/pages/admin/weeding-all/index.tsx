import React from "react";
import { Link } from "react-router-dom";
import {
    useDelWeedingMutation,
    useGetAllWeedingsQuery,
} from "../../../app/services/weeding";
import { AdminContainer } from "../../../components/containers";
import { useDelWeedingPortfolioMutation } from "../../../app/services/portfolio";
import { PATHS } from "../../../paths";
import styles from "./index.module.css";

const WeedingAll = () => {
    const {
        data: weedings,
        isLoading,
        isError,
        refetch,
    } = useGetAllWeedingsQuery();

    const [deletePortfolio] = useDelWeedingPortfolioMutation();
    const [deleteWeeding] = useDelWeedingMutation();

    const handleEdit = (id: string) => {
        // Логика для редактирования свадьбы
        console.log("Редактировать свадьбу с ID:", id);
        // Здесь может быть вызов навигации или открытие модального окна для редактирования
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Вы действительно хотите удалить?")) {
            try {
                await deletePortfolio(id).unwrap();
                await deleteWeeding(id).unwrap();
                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (isLoading) return <p className={styles.loadingMessage}>Загрузка...</p>;
    if (isError)
        return (
            <p className={styles.errorMessage}>
                Произошла ошибка при загрузке данных.
            </p>
        );

    return (
        <AdminContainer>
            <div className={styles.gridContainer}>
                <div className={styles.gridHeader}>ID</div>
                <div className={styles.gridHeader}>Название</div>
                <div className={styles.gridHeader}>Действия</div>
                {weedings?.map((weeding) => (
                    <React.Fragment key={weeding.id}>
                        <div className={styles.gridItem}>
                            <Link to={PATHS.weedingOne + "/" + weeding.id}>
                                {weeding.id}
                            </Link>
                        </div>
                        <div className={styles.gridItem}>
                            <Link to={PATHS.weedingOne + "/" + weeding.id}>
                                {weeding.name}
                            </Link>
                        </div>
                        <div className={styles.gridItem}>
                            <button
                                onClick={() => handleEdit(weeding.id)}
                                className={styles.editButton}
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(weeding.id)}
                                className={styles.deleteButton}
                            >
                                Удалить
                            </button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </AdminContainer>
    );
};

export default WeedingAll;
