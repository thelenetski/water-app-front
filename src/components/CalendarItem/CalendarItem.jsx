import css from "./CalendarItem.module.css";
import { useDispatch } from "react-redux";
import { addActiveDate } from "../../redux/waters/slice.js";

const CalendarItem = ({ day, currentDay }) => {
  const dispatch = useDispatch();

  const chooseDay = (e) => {
    dispatch(addActiveDate({ day: Number(e.target.innerHTML) }));
  };

  return (
    <div className={css.container}>
      <button
        type="button"
        className={`${css.item} ${css.notCompleted} ${
          new Date().getDate() === day && css.currentDay
        } ${currentDay === day && css.pickedDay}`}
        onClick={chooseDay}
      >
        {day}
      </button>
      <span className={css.percentage}>0%</span>
    </div>
  );
};

export default CalendarItem;
