import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import css from "./MonthInfo.module.css";
import { selectActiveDay } from "../../redux/waters/selectors.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addActiveDay } from "../../redux/waters/slice.js";
import {useEffect} from "react";
import {getWaterMonthly} from "../../redux/waters/operations.js";
const MonthInfo = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectActiveDay);

  const monthName = new Date(
    currentDate.year,
    currentDate.month - 1,
    currentDate.day
  ).toLocaleString("en-EN", { month: "long" });

  const daysOfMonth = new Date(
    currentDate.year,
    currentDate.month,
    0
  ).getDate();

  const nextMonth = () => {
    const date = new Date(currentDate.year, currentDate.month + 1);
    if (date.getFullYear() !== currentDate.year) {
      dispatch(addActiveDay({ year: date.getFullYear() }));
    }

    dispatch(addActiveDay({ month: date.getMonth() }));
  };

  const prevMonth = () => {
    const date = new Date(currentDate.year, currentDate.month - 1);
    const updatedYear = date.getFullYear();
    const updatedMonth = date.getMonth();

    dispatch(addActiveDay({ year: updatedYear, month: updatedMonth }));
  };

    useEffect(() => {
        dispatch(getWaterMonthly({month: currentDate.month, year: currentDate.year}));
    }, [currentDate]);
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
