import styles from './AdvantagesSection.module.css';
import AdvantagesList from '../AdvantagesList/AdvantagesList';

const AdvantagesSection = () => {
    const advantages = ['Habit drive', 'View statistics', 'Personal rate setting'];

    return (
        <section className={styles.advantagesSection}>
            <div className={styles.advantagesContent}>
                <button className={styles.advantagesCaption}>
                    Our <span className={styles.advantagesCaptionSpan}>happy</span> customers
                </button>
                <AdvantagesList items={advantages} />
            </div>
        </section>
    );
};

export default AdvantagesSection;
