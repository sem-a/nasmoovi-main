import Layout from '../../components/layout';
import styles from './index.module.css';

const Err404 = () => {
    return(
        <Layout>
            <div className={styles.notFoundPage}>
                <h1>404 - Страница не найдена</h1>
            </div>
        </Layout>
    )
}

export default Err404;