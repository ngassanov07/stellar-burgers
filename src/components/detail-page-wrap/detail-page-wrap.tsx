import { FC, ReactNode } from 'react';
import styles from './detail-page-wrap.module.css';

type TDetailPageWrapProps = {
  title?: string;
  children: ReactNode;
};

export const DetailPageWrap: FC<TDetailPageWrapProps> = ({
  title,
  children
}) => (
  <div className={styles.wrap}>
    {title && (
      <p className={`text text_type_main-large ${styles.header}`}>{title}</p>
    )}
    {children}
  </div>
);
