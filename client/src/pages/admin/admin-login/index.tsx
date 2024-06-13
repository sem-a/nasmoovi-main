import Layout from "../../../components/layout";
import { Form, Row, Space } from "antd";
import { Container } from "../../../components/containers";
import { CustomButton, CustomInput, ErrorMessage, PasswordInput } from "../../../components/form-item";
import { CustomCard } from "../../../components/custom-card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData, useLoginMutation } from "../../../app/services/auth";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { PATHS } from "../../../paths";
import styles from "./index.module.css";

const Login = () => {
    const navigate = useNavigate()
    const [loginUser] = useLoginMutation();
    const [error, setError] = useState("");

    const login = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();
            navigate(PATHS.weddingAll); // Измените эту строку для перехода на страницу админа
        } catch (err) {
            const maybeError = isErrorWithMessage(err);
            if (maybeError) {
                setError(err.data.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    };

    return (
        <Layout>
            <div className={styles.login}>
                <Container>
                    <Row align="middle" justify="center" style={{height: '100vh'}}>
                        <CustomCard
                            title="Панель администратора"
                            width="400px"
                            bordered={true}
                        >
                            <Form onFinish={login}>
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <PasswordInput
                                    name="password"
                                    placeholder="Пароль"
                                />
                                <CustomButton type="primary" htmlType="submit">
                                    Войти
                                </CustomButton>
                            </Form>
                            <Space direction="vertical" size="large">
                                <ErrorMessage message={error} />
                            </Space>
                        </CustomCard>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default Login;
