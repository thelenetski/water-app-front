import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import css from "./MonthInfo.module.css";
import {
  selectActiveDay,
  selectWatersDaily,
} from "../../redux/waters/selectors.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addActiveDay } from "../../redux/waters/slice.js";
import { useEffect } from "react";
import { getWaterMonthly } from "../../redux/waters/operations.js";
const MonthInfo = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectActiveDay);
  const watersDaily = useSelector(selectWatersDaily);

  const monthName = new Date(
    currentDate.year,
    currentDate.month,
    currentDate.day
  ).toLocaleString("en-EN", { month: "long" });

  const daysOfMonth = new Date(
    currentDate.year,
    currentDate.month + 1,
    0
  ).getDate();

  const nextMonth = () => {
    const date = new Date(currentDate.year, currentDate.month + 1);

    dispatch(
      addActiveDay({
        year: date.getFullYear(),
        month: date.getMonth(),
      })
    );
  };

  const prevMonth = () => {
    const date = new Date(currentDate.year, currentDate.month - 1);

    dispatch(
      addActiveDay({
        year: date.getFullYear(),
        month: date.getMonth(),
      })
    );
  };

  useEffect(() => {
    dispatch(
      getWaterMonthly({ month: currentDate.month + 1, year: currentDate.year })
    );
  }, [dispatch, currentDate, watersDaily]);
  return (
    <div className={css.container}>
      <div className={css.monthInfo}>
        <span className={css.text}>Month</span>
        <CalendarPagination
          year={currentDate.year}
          month={currentDate.month}
          day={currentDate.day}
          monthName={monthName}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />
      </div>
      <Calendar daysOfMonth={daysOfMonth} day={currentDate.day} />
    </div>
  );
};

export default MonthInfo;
