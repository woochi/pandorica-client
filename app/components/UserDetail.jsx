import React from 'react';
import styles from './UserDetail.scss';

const UserDetail = (props) => (
  <div>
    <div className={styles.value}>{props.value}</div>
    <div className={styles.label}>{props.label}</div>
  </div>
);

export default UserDetail;
