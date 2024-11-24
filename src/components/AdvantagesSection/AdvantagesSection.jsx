import React from 'react';
import styles from './AdvantagesSection.module.css';

const SimpleList = ({ items }) => {
    return (
        <ul className={styles.advantagesList}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`${styles.advantagesItem} ${
                        item === "Habit drive" ? styles.withDot : ""
                    }`}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

const AdvantagesSection = () => {
    const advantages = ["Habit drive", "View statistics", "Personal rate setting"];

    return (
        <section className={styles.advantagesSection}>
            <div className={styles.advantagesContent}>
                <p className={styles.advantagesCaption}>Our happy customers</p>
                <SimpleList items={advantages} />
            </div>
        </section>
    );
};

export default AdvantagesSection;
