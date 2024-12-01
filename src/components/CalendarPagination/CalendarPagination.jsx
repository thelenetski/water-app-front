import css from './CalendarPagination.module.css'

const CalendarPagination = ({year, monthName, nextMonth, prevMonth}) => {
    return <div className={css.container}>
    <button type="button" onClick={prevMonth}>prev</button><span className={css.text}>{`${monthName}, ${year}`}</span><button type="button" onClick={nextMonth}>next</button>
    </div>
}

export default CalendarPagination