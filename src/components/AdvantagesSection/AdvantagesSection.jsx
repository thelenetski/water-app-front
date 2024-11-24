import React from 'react';
import styles from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
    return (
        <section className={styles.advantagesSection}>
            <img
                src="/assets/background.jpg"
                alt="Background"
                className={styles.advantagesBackground}
            />
            <div className={styles.advantagesContent}>
                <p className={styles.advantagesCaption}>Our happy customers</p>
                <ul className={styles.advantagesList}>
                    <li className={styles.advantagesItem}>Habit drive</li>
                    <li className={styles.advantagesItem}>View statistics</li>
                    <li className={styles.advantagesItem}>Personal rate setting</li>
                </ul>
            </div>
        </section>
    );
};

export default AdvantagesSection;