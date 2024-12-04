import CalendarItem from "../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import { useSelector } from "react-redux";
import { selectWatersMonthly, selectActiveDay } from "../../redux/waters/selectors.js";
import { selectUser } from "../../redux/user/selectors.js";
const Calendar = ({ daysOfMonth, day }) => {
  const months = useSelector(selectWatersMonthly);
  const userData = useSelector(selectUser);
  const currentData = useSelector(selectActiveDay)

  const components = Array.from({ length: daysOfMonth }, (_, index) => {
    const currentDayStart = new Date(
      Date.UTC(currentData.year, currentData.month, index + 1)
    );
    const nextDayStart = new Date(currentDayStart);
    nextDayStart.setUTCDate(currentDayStart.getUTCDate() + 1);

    const dataFromDay = months.filter((month) => {
      const createdAt = new Date(month.date).getTime();
      return (
        createdAt >= currentDayStart.getTime() &&
        createdAt < nextDayStart.getTime()
      );
    });

    return dataFromDay || undefined;
  });
 
  return (
    <>
      {userData && (
        <div className={css.calendarItems}>
          {components.map((item, index) => (
            <div key={index}>
              <CalendarItem
                day={index + 1}
                currentDay={day}
                data={item}
                dailyNorm={userData.data.dailyNorm}
                currentData={currentData}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Calendar;
