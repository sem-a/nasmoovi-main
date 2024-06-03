import { useGetAllVideoQuery } from '../../app/services/video';
import { Container } from '../../components/containers';
import ServerError from '../../components/error';
import Layout from '../../components/layout';
import LoadingScreen from '../../components/loading';
import VideoPlayer from '../../components/videoPlayer';
import styles from './index.module.css';


const VideosList = () => {

    const { data: videos, isLoading, isError } = useGetAllVideoQuery();

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError) {
        <ServerError />;
    }
    if (!videos) {
        return <div>undefined</div>;
    }


    const videosList = videos.map((item, index) => {
        const isEven = index % 2 == 0;
        let alignItems = "flex-start";
        if (isEven) {
            alignItems = "flex-end";
        }
        return (
            <div key={item.id} className={styles.videosContainer}>
                <VideoPlayer title={item.name} url={item.videoPath} alignItems={alignItems} />
            </div>
        );
    });

    return(
        <div className={styles.videosList}>{videosList}</div>
    )
}

const VideosPage = () => {
    return(
        <Layout>
            <Container>
                <VideosList />
            </Container>
        </Layout>
    );
}

export default VideosPage;