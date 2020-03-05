import React from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './index.scss';

export function Header() {
    return (
        <div className={styles.container}>
            <img src={require('../../assets/images/back.svg')} className={styles.backIcon} />
            <div className={styles.title}>Introduction to Programming</div>
            <div className={styles.liveIcon}>Live</div>
            <div className={styles.viewers}><img src={require('../../assets/images/eye.svg')} className={styles.eyeIcon} /><span>300</span></div>
        </div>
    )
}

export default hot(Header);