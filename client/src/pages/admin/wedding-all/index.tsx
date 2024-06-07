import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useDelWeddingMutation,
    useGetAllWeddingsQuery,
} from "../../../app/services/wedding";
import { AdminContainer } from "../../../components/containers";
import { useDelWeddingPortfolioMutation } from "../../../app/services/portfolio";
import { PATHS } from "../../../paths";
import styles from "./index.module.css";
import ServerError from "../../../components/error";

const WeddingAll = () => {

    const navigate = useNavigate();

    const {
        data: weddings,
        isLoading,
        isError,
        refetch,
    } = useGetAllWeddingsQuery();

    const [deletePortfolio] = useDelWeddingPortfolioMutation();
    const [deleteWedding] = useDelWeddingMutation();

    const handleEdit = (id: string) => {
        navigate(`${PATHS.preview}/${id}`); 
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Вы действительно хотите удалить?")) {
            try {
                await deletePortfolio(id).unwrap();
                await deleteWedding(id).unwrap();
                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (isLoading) return <p className={styles.loadingMessage}>Загрузка...</p>;
    if (isError)
        return (
            <ServerError />
        );

    return (
        <AdminContainer>
            <div className={styles.gridContainer}>
                <div className={styles.gridHeader}>ID</div>
                <div className={styles.gridHeader}>Название</div>
                <div className={styles.gridHeader}>Действия</div>
                {weddings?.map((wedding) => (
                    <React.Fragment key={wedding.id}>
                        <div className={styles.gridItem}>
                            <Link to={PATHS.weddingOne + "/" + wedding.id}>
                                {wedding.id}
                            </Link>
                        </div>
                        <div className={styles.gridItem}>
                            <Link to={PATHS.weddingOne + "/" + wedding.id}>
                                {wedding.name}
                            </Link>
                        </div>
                        <div className={styles.gridItem}>
                            <button
                                onClick={() => handleEdit(wedding.id)}
                                className={styles.editButton}
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(wedding.id)}
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

export default WeddingAll;
