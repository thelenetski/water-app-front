import css from "./ChooseDate.module.css";
import { useSelector } from "react-redux";
import { selectActiveDay } from "../../redux/waters/selectors.js";
import { useTranslation } from 'react-i18next';

const ChooseDate = () => {
  const { t } = useTranslation();

  const currentDate = useSelector(selectActiveDay);

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  const day = currentDate?.day;
  const date = `${currentDate?.day}.${currentDate?.month + 1}.${
    currentDate?.year
  }`;

  const months = [
    t("ChooseDate.January"),
    t("ChooseDate.February"),
    t("ChooseDate.March"),
    t("ChooseDate.April"),
    t("ChooseDate.May"),
    t("ChooseDate.June"),
    t("ChooseDate.July"),
    t("ChooseDate.August"),
    t("ChooseDate.September"),
    t("ChooseDate.October"),
    t("ChooseDate.November"),
    t("ChooseDate.December"),
  ];

  const month = currentDate !== null ? months[+currentDate?.month] : "??";

  return (
    <>
      <h2 className={css.date}>
        {currentDate !== null &&
        date.toString().padStart(10, "0") === localDate()
          ? t("ChooseDate.Today")
          : `${day}, ${month}`}
      </h2>
    </>
  );
};

export default ChooseDate;
