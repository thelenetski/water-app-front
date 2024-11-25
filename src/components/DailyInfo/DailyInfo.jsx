import css from "./DailyInfo.module.css"

const DailyInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  )
}

export default DailyInfo