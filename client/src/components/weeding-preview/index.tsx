import React from 'react';
import { useGetWeedingPreviewQuery } from "../../app/services/portfolio";
import { H4 } from '../title';
import styles from "./index.module.css";
import LoadingScreen from '../loading';

type Props = {
    id: string;
    name: string;
    alignItems?: string;
}

type WeedingPreviewImage = {
    id: string;
    imgPath: string;
}

const WeedingPreview: React.FC<Props> = ({id, name, alignItems}) => {
    const {data: weedingPreview, isLoading, isError} = useGetWeedingPreviewQuery(id);



    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <div>Произошла ошибка при загрузке превью.</div>;
    }

    return (
        <div className={styles.weedingPreview} style={{alignItems: alignItems}}>
            <div className={styles.imagesContainer}>
                {weedingPreview?.slice(0, 3).map((image: WeedingPreviewImage) => (
                    <img
                        key={image.id}
                        src={`http://localhost:8000/${image.imgPath}`}
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

export default WeedingPreview;