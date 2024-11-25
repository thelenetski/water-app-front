import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logoWrapper}>
            <span className={styles.logoText}>AQUATRACK</span>
        </div>
    );
};

export default Logo;
