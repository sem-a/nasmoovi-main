import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageCheckbox } from "../../../components/form-item";
import {
  useGetForIdPortfolioQuery,
  useUpdatePreviewPortfolioMutation,
} from "../../../app/services/portfolio";
import { Form, Button } from "antd";
import { AdminContainer } from "../../../components/containers";
import styles from "./index.module.css";
import LoadingScreen from "../../../components/loading";
import ServerError from "../../../components/error";
import NoData from "../../../components/nodata";
import { PATHS } from "../../../paths";

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
  const navigate = useNavigate();

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
    try {
      // Создаем массив промисов на основе selectedImages
      const updatePromises = Object.entries(selectedImages).map(
        ([imageId, isPreview]) =>
          updatePreview({
            id: imageId,
            preview: isPreview,
          }).unwrap()
      );
      // Ждем, пока все промисы будут успешно выполнены
      await Promise.all(updatePromises);

      // Если все промисы выполнены успешно, показываем alert
      alert("Все изображения успешно обновлены!");
      navigate(PATHS.weddingAll);
    } catch (error) {
      // Если в каком-то промисе произошла ошибка, выводим сообщение об ошибке
      alert("Произошла ошибка при обновлении изображений.");
      console.error(error);
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
