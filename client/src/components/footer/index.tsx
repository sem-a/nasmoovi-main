import { Flex } from "antd";
import { Container } from "../containers";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerItem}>
                        <div className={styles.logo}>
                            <h2>NASMOOVI</h2>
                        </div>
                    <div className={styles.copyright}>
                        <p>©Copyright. All right reserved.</p>
                    </div>
                    <div className={styles.year}>
                        <p>2019-2024</p>
                    </div>
                </div>
                <div className={styles.social}>
                    <span className={styles.navTriggerIcon}></span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;