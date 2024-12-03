import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import css from "./MonthInfo.module.css";
import { selectActiveDate } from "../../redux/waters/selectors.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addActiveDate } from "../../redux/waters/slice.js";
const MonthInfo = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectActiveDate);

  console.log(currentDate.month);
  const monthName = new Date(
    currentDate.year,
    currentDate.month,
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
      dispatch(addActiveDate({ year: date.getFullYear() }));
    }

    dispatch(addActiveDate({ month: date.getMonth() }));
  };

  const prevMonth = () => {
    const date = new Date(currentDate.year, currentDate.month - 1);
    const updatedYear = date.getFullYear();
    const updatedMonth = date.getMonth();

    dispatch(addActiveDate({ year: updatedYear, month: updatedMonth }));
  };

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
