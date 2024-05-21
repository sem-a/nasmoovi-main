import React, { useState } from "react";
import { Upload, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { useAddVideoMutation } from "../../../app/services/video";
import { H2 } from "../../../components/title";
import { AdminContainer } from "../../../components/containers";

const VideoUploadForm: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [videoName, setVideoName] = useState(""); // Состояние для хранения названия видео
    const [addVideo, { isLoading }] = useAddVideoMutation();

    const handleUpload = async () => {
        const formData = new FormData();
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("video", fileList[0].originFileObj); // Предполагается, что загружается один файл
            formData.append("name", videoName); // Добавление названия видео в formData

            try {
                const result = await addVideo(formData).unwrap();
                message.success("Видео успешно добавлено");
                setFileList([]);
                setVideoName(""); // Очистить поле названия видео после успешной загрузки
                console.log(result);
            } catch (error: any) {
                message.error("Ошибка при добавлении видео");
                console.error("Ошибка при добавлении видео:", error);
            }
        } else {
            message.error("Пожалуйста, выберите файл для загрузки и укажите название.");
        }
    };

    const onChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList);
    };

    return (
        <AdminContainer>
            <H2 textAlign="start">Добавление видео</H2>
            <Input
                placeholder="Введите название видео"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                disabled={isLoading}
                style={{ marginBottom: 16 }}
            />
            <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={onChange}
                accept="video/*"
            >
                <Button icon={<UploadOutlined />} disabled={isLoading}>
                    Выбрать видео
                </Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!videoName || fileList.length === 0 || isLoading}
                style={{ marginTop: 16 }}
            >
                {isLoading ? "Загрузка..." : "Загрузить"}
            </Button>
        </AdminContainer>
    );
};

export default VideoUploadForm;