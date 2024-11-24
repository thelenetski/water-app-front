import styles from './AdvantagesSection.module.css';
import AdvantagesList from '../AdvantagesList/AdvantagesList';

const AdvantagesSection = () => {
    const advantages = ['Habit drive', 'View statistics', 'Personal rate setting'];

    return (
        <section className={styles.advantagesSection}>
            <div className={styles.advantagesContent}>
                <p className={styles.advantagesCaption}>Our happy customers</p>
                <AdvantagesList items={advantages} />
            </div>
        </section>
    );
};

export default AdvantagesSection;
