import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <WelcomeSection />
      <AdvantagesSection />
    </main>
  );
};

export default HomePage;
