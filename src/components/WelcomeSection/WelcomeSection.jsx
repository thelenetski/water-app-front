import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.welcomeSection}>
      <Logo />
      <div className={styles.welcomeSectionWrapper}>
        <p className={styles.welcomeSubtitle}>
          Record daily water intake and track
        </p>
        <h1 className={styles.welcomeTitle}>Water consumption tracker</h1>
        <div className={styles.welcomeButtons}>
          <button
            className={styles.tryTrackerButton}
            onClick={() => navigate("/signup")}
          >
            Try tracker
          </button>
          <button
            className={styles.signInButton}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
