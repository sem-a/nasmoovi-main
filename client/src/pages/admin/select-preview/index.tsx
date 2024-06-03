import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageCheckbox } from "../../../components/form-item";
import { useGetForIdPortfolioQuery, useUpdatePreviewPortfolioMutation } from "../../../app/services/portfolio";
import { Form, Button } from "antd";
import { AdminContainer } from "../../../components/containers";
import styles from "./index.module.css";
import LoadingScreen from "../../../components/loading";
import ServerError from "../../../components/error";
import NoData from "../../../components/nodata";

interface PortfolioItem {
    id: string;
    imgPath: string;
    preview: boolean;
    weddingId?: string;
}

interface SelectedImages {
    [key: string]: boolean;
}

const SelectPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImages, setSelectedImages] = useState<SelectedImages>({});
    const [updatePreview] = useUpdatePreviewPortfolioMutation();

    const {
        data: portfolio,
        isLoading,
        isError,
    } = useGetForIdPortfolioQuery(id!);

    useEffect(() => {
        if (portfolio) {
            const newSelectedImages: SelectedImages = {};
            portfolio.forEach((item: PortfolioItem) => {
                if (item.preview) {
                    newSelectedImages[item.id] = true;
                }
            });
            setSelectedImages(newSelectedImages);
        }
    }, [portfolio]);

    const handleImageChange = (imageId: string, isChecked: boolean): void => {
        setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [imageId]: isChecked,
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        const updatePromises = Object.entries(selectedImages)
            .map(([imageId, isPreview]) => {
                return updatePreview({
                    id: imageId,
                    preview: isPreview,
                }).unwrap();
            });

        try {
            await Promise.all(updatePromises);
            alert("Обновление успешно выполнено!");
        } catch (error) {
            console.error("Ошибка при обновлении:", error);
            alert("Ошибка при обновлении!");
        }
    };

    if (isLoading) return <LoadingScreen />;
    if (isError) return <ServerError />;
    if (!portfolio) return <NoData />;

    const portfolioList = portfolio.map((item: PortfolioItem) => (
        <ImageCheckbox
            key={item.id}
            id={item.id}
            src={item.imgPath}
            alt={`Изображение ${item.id}`}
            onChange={handleImageChange}
            checked={selectedImages[item.id] ?? item.preview}
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