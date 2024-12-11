import { addActiveDay } from "../../redux/waters/slice";
import css from "./CalendarItem.module.css";
import { useDispatch } from "react-redux";
const CalendarItem = ({ day, currentDay, data, dailyNorm, currentData }) => {
  const dispatch = useDispatch();
  const chooseDay = (e) => {
    dispatch(addActiveDay({ day: Number(e.target.innerHTML) }));
  };

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  const currentDate = new Date();
  const isCurrentDate =
    new Date(
      currentData.year,
      currentData.month,
      currentDate.getDate()
    ).getTime() ===
    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getTime();

  const date = `${currentData?.day}.${(currentData?.month + 1)
    .toString()
    .padStart(2, "0")}.${currentData?.year}`;

  return (
    <div className={css.container}>
      <button
        type="button"
        className={`${css.item} ${
          data?.reduce((acc, item) => (acc += item.amount), 0) >= dailyNorm
            ? css.completed
            : css.notCompleted
        } ${isCurrentDate && css.currentDay} ${
          currentDay === day && css.pickedDay
        } ${
          parseDate((day + date.slice(2, 10)).toString().padStart(10, "0")) >
          parseDate(localDate())
            ? css.Disabled
            : ""
        }`}
        onClick={chooseDay}
      >
        {day}
      </button>
      <span className={css.percentage}>
        {`${
          data &&
          Math.round(
            (data?.reduce((acc, item) => (acc += item.amount), 0) / dailyNorm) *
              100
          )
        }`}
        %
      </span>
    </div>
  );
};

export default CalendarItem;
