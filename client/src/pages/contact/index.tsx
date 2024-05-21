import React from 'react';
import styles from './index.module.css';
import { Container } from '../../components/containers';
import Layout from '../../components/layout';

const Contact = () => {
    return(
        <Layout>
            <div className={styles.contact}>
                <Container>
                    <div className={styles.contactCenter}>
                        <div className={styles.contactFlex}>
                            <div className={styles.contactItem}>
                                <img src={require('../../img/photo.jpg')} alt="photo" />
                            </div>
                            <div className={styles.contactItem}>
                                <p className={styles.aboutText}>Фотограф Анастасия Соколова</p>
                                <p className={styles.text}>г. Санкт-Петербург и г. Гатчина</p>
                                <p className={styles.text}>ВКонтакте: <a href="https://m.vk.com/nasmoovi">nasmoovi</a></p>
                                <p className={styles.text}>Telegram: <a href="https://t.me/nas_sokolova">@nas_sokolova</a></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export default Contact;