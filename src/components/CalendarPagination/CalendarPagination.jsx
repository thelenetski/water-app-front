import css from './CalendarPagination.module.css'

const CalendarPagination = ({year, monthName, nextMonth, prevMonth}) => {
    return <div className={css.container}>
        <button type="button" onClick={prevMonth} className={css.button}>
            <svg className={`${css.icon} ${css.iconPrev}`}>
                <use href="/sprite.svg#icon-chevron-down"></use>
            </svg>
        </button>
        <span className={css.text}>{`${monthName}, ${year}`}</span>
        <button type="button" onClick={nextMonth} className={css.button}>
            <svg className={`${css.icon} ${css.iconNext}`}>
                <use href="/sprite.svg#icon-chevron-down"></use>
            </svg>
        </button>
    </div>
}

export default CalendarPagination