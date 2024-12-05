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
    t("January"),
    t("February"),
    t("March"),
    t("April"),
    t("May"),
    t("June"),
    t("July"),
    t("August"),
    t("September"),
    t("October"),
    t("November"),
    t("December"),
  ];

  const month = currentDate !== null ? months[+currentDate?.month] : "??";

  return (
    <>
      <h2 className={css.date}>
        {currentDate !== null &&
        date.toString().padStart(10, "0") === localDate()
          ? t("Today")
          : `${day}, ${month}`}
      </h2>
    </>
  );
};

export default ChooseDate;
