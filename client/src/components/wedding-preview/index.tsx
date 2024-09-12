import React from 'react';
import { useGetWeddingPreviewQuery } from "../../app/services/portfolio";
import { H4 } from '../title';
import styles from "./index.module.css";
import LoadingScreen from '../loading';

type Props = {
    id: string;
    name: string;
    alignItems?: string;
}

type WeddingPreviewImage = {
    id: string;
    imgPath: string;
}

const WeddingPreview: React.FC<Props> = ({id, name, alignItems}) => {
    const {data: weddingPreview, isLoading, isError} = useGetWeddingPreviewQuery(id);



    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <div>Произошла ошибка при загрузке превью.</div>;
    }

    return (
        <div className={styles.weddingPreview} style={{alignItems: alignItems}}>
            <div className={styles.imagesContainer}>
                {weddingPreview?.slice(0, 3).map((image: WeddingPreviewImage) => (
                    <img
                        key={image.id}
                        src={`${image.imgPath}`}
                        alt={`Фото свадьбы ${name}`}
                        className={styles.previewImage}
                    />
                ))}
            </div>
            <div className={styles.line}></div>
            <H4 textAlign='end'>{name}</H4>
        </div>
    );
};

export default WeddingPreview;