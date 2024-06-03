import React from 'react';
import { H2 } from '../../components/title';
import styles from './index.module.css';

const NoData: React.FC = () => {
  return (
    <div className={styles.noDataPage}>
      <H2>Данные отсутствуют</H2>
      <p>Информация по вашему запросу не найдена.</p>
    </div>
  );
};

export default NoData;