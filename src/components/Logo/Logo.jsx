import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logoWrapper}>
            <img src="/logo.svg" alt="Aquatrack Logo" className={styles.logoImage} />
        </div>
    );
};

export default Logo;
