import styles from "./index.module.css";

const PortfolioCard: React.FC = () => {
    return (
        <div className={styles.businessCard}>
            <p className={styles.logo}>NASMOOVI</p>
            <p className={styles.city}>САНКТ-ПЕТЕРБУРГ</p>
            <p className={styles.name}>ФОТОГРАФ АНАСТАСИЯ СОКОЛОВА</p>
        </div>
    );
};

export default PortfolioCard;
