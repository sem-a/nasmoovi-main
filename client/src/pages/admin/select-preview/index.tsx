import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ImageCheckbox } from "../../../components/form-item";

import {
    useGetForIdPortfolioQuery,
    useUpdatePreviewPortfolioMutation,
} from "../../../app/services/portfolio";
import { Form, Button } from "antd";
import { AdminContainer } from "../../../components/containers";
import styles from "./index.module.css";
import LoadingScreen from "../../../components/loading";

// Определите типы для элементов вашего портфолио
interface PortfolioItem {
    id: string;
    imgPath: string;
    preview: boolean;
    weddingId?: string; // предполагаем, что это поле может быть необязательным
}

// Определите тип для состояния выбранных изображений
interface SelectedImages {
    [key: string]: boolean;
}

const SelectPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Указываем тип параметров маршрута
    const [selectedImages, setSelectedImages] = useState<SelectedImages>({});
    const [updatePreview] = useUpdatePreviewPortfolioMutation();

    const {
        data: portfolio,
        isLoading,
        isError,
    } = useGetForIdPortfolioQuery(id!);

    const handleImageChange = (imageId: string, isChecked: boolean): void => {
        setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [imageId]: isChecked,
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        const updatePromises = Object.entries(selectedImages)
            .map(([imageId, isPreview]) => {
                if (isPreview) {
                    return updatePreview({
                        id: imageId,
                        preview: isPreview,
                    }).unwrap();
                }
                return undefined;
            })
            .filter(Boolean);

        try {
            await Promise.all(updatePromises);
            alert("Обновление успешно выполнено!");
        } catch (error) {
            console.error("Ошибка при обновлении:", error);
            alert("Ошибка при обновлении!");
        }
    };

    if (isLoading) return <LoadingScreen />;
    if (isError) return <div>Ошибка загрузки данных</div>;
    if (!portfolio) return <div>Данные не найдены</div>;

    const portfolioList = portfolio.map((item) => (
        <ImageCheckbox
            key={item.id}
            id={item.id}
            src={item.imgPath}
            alt={item.id}
            onChange={handleImageChange}
            checked={selectedImages[item.id]}
        />
    ));

    return (
        <AdminContainer>
            <Form onFinish={handleSubmit}>
                <div className={styles.checkboxList}>{portfolioList}</div>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form>
        </AdminContainer>
    );
};

export default SelectPreview;
