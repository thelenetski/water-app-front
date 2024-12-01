import css from './CalendarItem.module.css'

const CalendarItem = ({day, currentDay}) => {
    return <div className={css.container}>
        <button type="button" className={`${css.item} ${css.notCompleted} ${currentDay === day ? css.currentDay : null}`}>{day}</button>
        <span className={css.percentage}>0%</span>
    </div>
}

export default CalendarItem