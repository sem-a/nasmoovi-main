import { useParams } from "react-router-dom";
import styles from "./index.module.css";

const Statuses: Record<string, string> = {
    created: 'Свадьба успешно создана',
    updated: 'Свадьба успешно обновлена',
    deleted: 'Свадьба успешно удалена'
}

const Status: React.FC = () => {

    const { status } = useParams();
    return <div>Статус</div>;
};

export default Status;
