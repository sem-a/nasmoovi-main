import { Form } from "antd";
import { H2 } from "../../../components/title";
import { CustomButton, CustomInput } from "../../../components/form-item";
import { useNavigate } from "react-router-dom";
import { useAddWeedingMutation } from "../../../app/services/weeding";
import { Weeding } from "@prisma/client";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { useState } from "react";
import { PATHS } from "../../../paths";
import { AdminContainer } from "../../../components/containers";

const WeedingAdd: React.FC = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [addWeeding] = useAddWeedingMutation();

    const handleAddWeeding = async (data: Weeding) => {
        try {
            const weeding = await addWeeding(data).unwrap();
            navigate(PATHS.portfolioAdd + `/${weeding.id}`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err);
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
            <Form onFinish={handleAddWeeding}>
                <CustomInput
                    name="name"
                    type="text"
                    placeholder="Название свадьбы"
                />
                <CustomButton type="primary" htmlType="submit">
                    Создать
                </CustomButton>
            </Form>
        </AdminContainer>
    );
};

export default WeedingAdd;
