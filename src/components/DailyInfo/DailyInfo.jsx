import css from "./DailyInfo.module.css";
import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";

const DailyInfo = () => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <ChooseDate />
        <AddWaterBtn section="daily"/>
      </div>
      {/* <WaterList /> */}
    </div>
  )
}

export default DailyInfo