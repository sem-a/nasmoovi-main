import { Card } from "antd";
import styles from './index.module.css';

type Props = {
    children: React.ReactNode;
    title?: string;
    bordered?: boolean;
    width?: string;
    backgroundColor?: string
}

export const CustomCard: React.FC<Props> = ({children, title, bordered = false, width, backgroundColor}) => {
    return(
        <Card title={title} bordered={bordered} className={styles.card} style={{width: width, backgroundColor: backgroundColor}}>
            {children}
        </Card>
    );
}