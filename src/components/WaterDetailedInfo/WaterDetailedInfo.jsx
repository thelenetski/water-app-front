import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <div className={css.WaterDetailedInfoWrapper}>
      <div className={css.TodayWaterInfoWrapper}>
        <UserPanel />
        <DailyInfo />
      </div>
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
