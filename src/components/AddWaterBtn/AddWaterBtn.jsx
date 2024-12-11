import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { openAddWater } from "../../redux/modal/slice";
import { selectActiveDay } from "../../redux/waters/selectors.js";
import { useTranslation } from "react-i18next";

const AddWaterBtn = ({ section }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentDate = useSelector(selectActiveDay);

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  const date = `${currentDate?.day}.${(currentDate?.month + 1)
    .toString()
    .padStart(2, "0")}.${currentDate?.year}`;

  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === "waterMain",
      [css.daily]: section === "daily",
      [css.btnDisabled]:
        parseDate(date.toString().padStart(10, "0")) > parseDate(localDate()),
    });

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day); // month - 1, так как месяцы в JS идут от 0 до 11
  }

  return (
    <>
      <button
        onClick={() => dispatch(openAddWater())}
        type="button"
        className={classes(css.wrapper)}
      >
        <FaPlus className={classes(css.plusIcon)} />
        <p className={classes(css.text)}>{t("AddWaterBtn.addWaterBtn")}</p>
      </button>
    </>
  );
};

export default AddWaterBtn;
