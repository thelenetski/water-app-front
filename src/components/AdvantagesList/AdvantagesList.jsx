import React from 'react';
import styles from './AdvantagesList.module.css';

const AdvantagesList = ({ items }) => {
    return (
        <ul className={styles.advantagesList}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`${styles.advantagesItem} ${
                        item === 'Habit drive' ? styles.withDot : ''
                    }`}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default AdvantagesList;
