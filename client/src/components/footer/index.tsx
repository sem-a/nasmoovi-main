import { Container } from "../containers";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";

const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerItem}>
          <Link to={PATHS.home}>
            <div className={styles.logo}>
              <h2>NASMOOVI</h2>
            </div>
          </Link>
          <div className={styles.footerText}>
            <p>Фотограф Анастасия Соколова г. Санкт-Петербург</p>
          </div>
          <div className={styles.copyright}>
            <p>©Copyright. All right reserved.</p>
          </div>
          <div className={styles.year}>
            <p>2019-{currentYear}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
