import styles from './AdvantagesList.module.css';

const AdvantagesList = ({ items }) => {
    return (
        <ul className={styles.advantagesList}>
            {items.map((item, index) => (
                <li key={index} className={styles.advantageItem}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default AdvantagesList;

