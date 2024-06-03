import React from "react";
import { AdminContainer } from "../../../components/containers";
import styles from "./index.module.css";
import { useDelVideoMutation, useGetAllVideoQuery } from "../../../app/services/video";
import ServerError from "../../../components/error";

const VideoAll = () => {
    const {
        data: videos,
        isLoading,
        isError,
        refetch,
    } = useGetAllVideoQuery();

    const [deleteVideo] = useDelVideoMutation();

    const handleDelete = async (id: string) => {
        if (window.confirm("Вы действительно хотите удалить?")) {
            try {
                await deleteVideo(id).unwrap();
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
                {videos?.map((video) => (
                    <React.Fragment key={video.id}>
                        <div className={styles.gridItem}>
                                {video.id}
                        </div>
                        <div className={styles.gridItem}>
                                {video.name}
                        </div>
                        <div className={styles.gridItem}>
                            <button
                                onClick={() => handleDelete(video.id)}
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

export default VideoAll;
