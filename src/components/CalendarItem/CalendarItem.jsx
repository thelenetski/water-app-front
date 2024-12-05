import { addActiveDay } from "../../redux/waters/slice";
import css from "./CalendarItem.module.css";
import { useDispatch } from "react-redux";
const CalendarItem = ({ day, currentDay, data, dailyNorm, currentData }) => {
  const dispatch = useDispatch();
  const chooseDay = (e) => {
    dispatch(addActiveDay({ day: Number(e.target.innerHTML) }));
  };

  const currentDate = new Date()
  const isCurrentDate = new Date(currentData.year, currentData.month, currentDate.getDate()).getTime() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getTime()
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
