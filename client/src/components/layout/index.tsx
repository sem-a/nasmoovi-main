import Footer from "../footer";
import Header from "../header";
import ScrollToTop from "../scroll-top";
import styles from "./index.module.css";

type Props = {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <ScrollToTop>
            <div className={styles.layout}>
                <Header />
                <div className={styles.main}>{children}</div>
                <Footer />
            </div>
        </ScrollToTop>
    );
};

export default Layout;
