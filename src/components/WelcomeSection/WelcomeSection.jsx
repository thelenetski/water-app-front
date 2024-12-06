import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import ToggleLang from "../ToggleLang/ToggleLang";
import styles from "./WelcomeSection.module.css";
import { useTranslation } from "react-i18next";

const WelcomeSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className={styles.welcomeSection}>
      <Logo />
      <ToggleLang />
      <div className={styles.welcomeSectionWrapper}>
        <p className={styles.welcomeSubtitle}>
          {t("WelcomeSection.welcomeSubText")}
        </p>
        <h1 className={styles.welcomeTitle}>
          {t("WelcomeSection.welcomeTitleText")}
        </h1>
        <div className={styles.welcomeButtons}>
          <button
            className={styles.tryTrackerButton}
            onClick={() => navigate("/signup")}
          >
            {t("WelcomeSection.btnTryTracker")}
          </button>
          <button
            className={styles.signInButton}
            onClick={() => navigate("/signin")}
          >
            {t("WelcomeSection.btnSignIn")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
