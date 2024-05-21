import Layout from '../../components/layout';
import { H2 } from '../../components/title';
import styles from './index.module.css';

const Err404 = () => {
    return(
        <Layout>
            <div className={styles.notFoundPage}>
                <H2 textAlign='center'>404 - Страница не найдена</H2>
            </div>
        </Layout>
    )
}

export default Err404;