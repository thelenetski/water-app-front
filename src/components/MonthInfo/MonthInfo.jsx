import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import css from "./MonthInfo.module.css";
import {
  selectActiveDay,
  selectWatersDaily,
  selectWatersMonthly
} from "../../redux/waters/selectors.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addActiveDay } from "../../redux/waters/slice.js";
import { useEffect, useState } from "react";
import { getWaterMonthly } from "../../redux/waters/operations.js";
import  MonthInfoChart  from '../MonthInfoChart/MonthInfoChart.jsx'
const MonthInfo = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectActiveDay);
  const watersDaily = useSelector(selectWatersDaily);
  const months = useSelector(selectWatersMonthly);
  const [info, setInfo] = useState(false);
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

  const getDateOnly = (dateTime) => dateTime.split('T')[0];

  const datesForChart = months.reduce((acc, item, index) => {
    const dateOnly = getDateOnly(item.date);
if (!acc[dateOnly]) {
  acc[dateOnly] = { ...item, date: dateOnly }; 
} else {
  acc[dateOnly].amount += item.amount;
}
return acc;
}, {})

const sortedDatesForChart = Object.values(datesForChart).sort((a,b) => {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  return dateA - dateB
})

const dataForChart = sortedDatesForChart.map((item,index) => ({amount: item.amount, name: index + 1}))

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
        {info ? <span className={css.text}>Chart</span> : <span className={css.text}>Month</span>}
        <div className={css.calendarPagination}>
          <CalendarPagination
            year={currentDate.year}
            month={currentDate.month}
            day={currentDate.day}
            monthName={monthName}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
          />
          <span>
            <button type="button" className={css.button} onClick={() => setInfo(prevInfo => dataForChart.length > 0 ? !prevInfo : false)}>
              <svg className={css.icon}>
                <use href="/sprite.svg#icon-pie-chart"></use>
              </svg>
            </button>
          </span>
        </div>
      </div>
     {!info && <Calendar daysOfMonth={daysOfMonth} day={currentDate.day} months={months}/> }
     {info && <MonthInfoChart data={dataForChart}/>}
    </div>
  );
};

export default MonthInfo;
