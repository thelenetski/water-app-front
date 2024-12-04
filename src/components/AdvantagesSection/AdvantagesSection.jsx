import styles from './AdvantagesSection.module.css';
import AdvantagesList from '../AdvantagesList/AdvantagesList';

const AdvantagesSection = () => {
    const advantages = ['Habit drive', 'View statistics', 'Personal rate setting'];

    return (
        <section className={styles.advantagesSection}>
            <div className={styles.advantagesContent}>
                <div className={styles.advantagesCaption}>
                <div className={styles.avatarGroup}>
                 <div className={`${styles.avatarItem} ${styles.avatar1}`}></div>
                 <div className={`${styles.avatarItem} ${styles.avatar2}`}></div>
                 <div className={`${styles.avatarItem} ${styles.avatar3}`}></div>
                </div>
                <div className={styles.advantagesCaptionText}>Our <span className={styles.advantagesCaptionSpan}>happy</span> customers</div>                   
                </div>
                <AdvantagesList items={advantages} />
            </div>
        </section>
    );
};

export default AdvantagesSection;
