import CalendarItem from "../CalendarItem/CalendarItem.jsx";
import css from './Calendar.module.css'
const Calendar = ({ daysOfMonth, day}) => {
    const components = Array.from({ length: daysOfMonth }, (_, index) => index);
    return <>
        <div className={css.calendarItems}>
            {components.map((item, index) => (
                <div key={index}>
                    <CalendarItem day={index + 1} currentDay={day} />
                </div>
            ))}
        </div>
    </>
}

export default Calendar