import { useCurrentQuery } from "../../app/services/auth";
import { H3 } from "../title";
import { CustomCard } from "../custom-card";
import Layout from "../layout";
import MenuAdmin from "../menu-admin";
import styles from './index.module.css';
import LoadingScreen from "../loading";

type Props = {
    children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export const AdminContainer: React.FC<Props> = ({children}) => {

    const { data: user, isLoading, isError } = useCurrentQuery();

    const isAdmin = !user ? false: user.admin;

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        return <h1>Ошибка</h1>;
    }

    return (
        <Layout>
            <Container>
                <div className={styles.adminUser}>
                    <CustomCard backgroundColor="#f6f6f4">
                        <div className={styles.sidebar}>
                            <H3 color="#776F60">Администратор:</H3>
                            <H3 color="#776F60">{user?.name}</H3>
                            <MenuAdmin isAdmin={isAdmin} />
                        </div>
                    </CustomCard>
                    <CustomCard backgroundColor="#f6f6f4">
                        {children}
                    </CustomCard>
                </div>
            </Container>
        </Layout>
    );
};
