import Layout from "../../components/layout";
import { H2, H3 } from "../../components/title";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";
import { useGetAllCommentQuery } from "../../app/services/comment";
import { Container } from "../../components/containers";
import styles from "./index.module.css";
import CustomSlider from "../../components/slider";
import CustomMarquee from "../../components/marquee";
import LoadingScreen from "../../components/loading";
import ServerError from "../../components/error";

const Home: React.FC = () => {
    let { data: comments, isLoading, isError } = useGetAllCommentQuery();

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        return <ServerError/>;
    }
    if (!comments) {
        comments = [
            {
                id: '0',
                name: 'Сальма',
                comment: "Боже, какая красота! Спасибо, что запечатлела наш день. С тобой было очень комфортно! И какую же невероятную красоту ты творишь!"
            }
        ]
    }

    return (
        <Layout>
            <div className={styles.welcome}>
                <div className={styles.welcomeImage}>
                    <img src={require('../../img/welcomeImg.jpg')} alt="welcome_image" />
                </div>
                <div className={styles.marquee}>
                    <CustomMarquee text=" NASMOOVI  NASMOOVI  NASMOOVI  NASMOOVI  NASMOOVI  NASMOOVI " />
                </div>
            </div>
            <div className={styles.portfolio}>
                <H2 textAlign="center">ПОРТФОЛИО</H2>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Link to={PATHS.weedings}>
                            <div
                                className={styles.portfolioAbs}
                                style={{ right: "21px" }}
                            >
                                <H3>СВАДЕБНЫЕ КАДРЫ</H3>
                            </div>
                            <img
                                src={require("../../img/portfolioCards.png")}
                                alt="портфолио фото"
                                className={styles.colImg}
                            />
                        </Link>
                    </div>
                    <div className={styles.col}>
                        <Link to={PATHS.video}>
                            <div
                                className={styles.portfolioAbs}
                                style={{ left: "21px" }}
                            >
                                <H3>СВАДЕБНЫЕ ВИДЕО</H3>
                            </div>
                            <img
                                src={require("../../img/portfolioVideo.png")}
                                alt="портфолио видео"
                                className={styles.colImg}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.about}>
                <Container>
                    <H2>ПРО МЕНЯ</H2>
                    <div className={styles.aboutGrid}>
                        <div className={styles.aboutMeText}>
                            <p>
                                Привет, я Настя. Снимаю любовь в самый важный
                                ваш день создания семьи. Делаю акцент на вас и
                                атмосферу вокруг. Создаю душевные кадры и фильмы
                                про ваши чувства.
                            </p>
                            <p>Санкт-Петербург и Нижний Новгород</p>
                        </div>
                        <div className={styles.aboutMeVideo}>
                            <img src={require("../../img/video.jpg")} alt="" />
                        </div>
                        <div className={styles.aboutMePhoto}>
                            <img src={require("../../img/photo.jpg")} alt="" />
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.comment}>
                <Container>
                    <div className={styles.sliderContainer}>
                        <CustomSlider comments={comments} />
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default Home;
