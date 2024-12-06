import styles from "./AdvantagesSection.module.css";
import AdvantagesList from "../AdvantagesList/AdvantagesList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/user/operations";
import { selectAllUsers } from "../../redux/user/selectors";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const usersAll = useSelector(selectAllUsers);

  const advantages = [
    t("AdvantagesSection.habitText"),
    t("AdvantagesSection.viewStatText"),
    t("AdvantagesSection.personalRateSetting"),
  ];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const usersData =
    usersAll.data && Array.isArray(usersAll.data) ? usersAll.data : [];

  return (
    <section className={styles.advantagesSection}>
      <div className={styles.advantagesContent}>
        <div className={styles.advantagesCaption}>
          {usersData.length > 1 && (
            <div className={styles.avatarGroup}>
              <div
                className={`${styles.avatarItem} ${styles.avatar1}`}
                style={{
                  backgroundImage: `url(${
                    usersData[getRandomNumber(0, usersData.length - 1)]
                  })`,
                }}
              ></div>
              <div
                className={`${styles.avatarItem} ${styles.avatar2}`}
                style={{
                  backgroundImage: `url(${
                    usersData[getRandomNumber(0, usersData.length - 1)]
                  })`,
                }}
              ></div>
              <div
                className={`${styles.avatarItem} ${styles.avatar3}`}
                style={{
                  backgroundImage: `url(${
                    usersData[getRandomNumber(0, usersData.length)]
                  })`,
                }}
              ></div>
            </div>
          )}
          <div className={styles.advantagesCaptionText}>
            {usersAll.countOfUsers || t("AdvantagesSection.captionTextOne")}
            <span className={styles.advantagesCaptionSpan}>
              {" "}
              {t("AdvantagesSection.captionTextTwo")}
            </span>{" "}
            {t("AdvantagesSection.captionTextThree")}
          </div>
        </div>
        <AdvantagesList items={advantages} />
      </div>
    </section>
  );
};

export default AdvantagesSection;
