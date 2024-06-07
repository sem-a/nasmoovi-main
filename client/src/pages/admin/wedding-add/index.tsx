import { Form } from "antd";
import { H2 } from "../../../components/title";
import { CustomButton, CustomInput, CustomTextarea } from "../../../components/form-item";
import { useNavigate } from "react-router-dom";
import { useAddWeddingMutation } from "../../../app/services/wedding";
import { Wedding } from "@prisma/client";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { useState } from "react";
import { PATHS } from "../../../paths";
import { AdminContainer } from "../../../components/containers";

const WeddingAdd: React.FC = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [addWedding] = useAddWeddingMutation();

    const handleAddWedding = async (data: Wedding) => {
        try {
            const wedding = await addWedding(data).unwrap();
            navigate(PATHS.portfolioAdd + `/${wedding.id}`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err)
            if (maybeError) {
                setError(err.data.message);
            } else {
                setError("Неизвестная ошибка!");
            }
        }
    };

    return (
        <AdminContainer>
            <H2 textAlign="start">Добавление свадьбы</H2>
            <Form onFinish={handleAddWedding}>
                <CustomInput
                    name="name"
                    type="text"
                    placeholder="Название свадьбы"
                />
                <CustomTextarea name="description"
                    type="text"
                    placeholder="Описание свадьбы (2-3 предложения)"/>
                <CustomButton type="primary" htmlType="submit">
                    Создать
                </CustomButton>
            </Form>
        </AdminContainer>
    );
};

export default WeddingAdd;
