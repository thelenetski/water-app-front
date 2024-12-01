import Calendar from '../Calendar/Calendar.jsx';
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import {useEffect, useState} from "react";
import css from './MonthInfo.module.css'
const MonthInfo = () => {
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(3);
    const [day, setDay] = useState(1);

    const monthName = new Date(year, month, day).toLocaleString('en-EN', {month: 'long'})

    const daysOfMonth = new Date(year, month, 0).getDate();

    const nextMonth = () => {
        setMonth((prevMonth) => {
            const date = new Date(year, prevMonth + 1);
            if(date.getFullYear() !== year) {
                setYear(date.getFullYear());
            }

            return date.getMonth()
        })
    }

    const prevMonth = () => {
        setMonth((prevMonth) => {
            const date = new Date(year, prevMonth - 1);
            if(date.getFullYear() !== year) {
                setYear(date.getFullYear());
            }

            return date.getMonth()
        })
    }

    useEffect(() => {
        console.log(year, day, month)
    }, [month]);

    return <div className={css.container}>
    <div className={css.monthInfo}>
        <span className={css.text}>Month</span>
        <CalendarPagination year={year} month={month} day={day} monthName={monthName} nextMonth={nextMonth} prevMonth={prevMonth} />
    </div>
    <Calendar daysOfMonth={daysOfMonth} day={day}/>
    </div>
}

export default MonthInfo;