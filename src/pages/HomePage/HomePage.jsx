import React from 'react';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <main className={styles.homePage}>
            <header className={styles.header}>
                <Logo />
            </header>
            <WelcomeSection />
            <AdvantagesSection />
        </main>
    );
};

export default HomePage;