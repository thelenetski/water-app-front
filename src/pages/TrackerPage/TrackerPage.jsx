import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { getUserCurrent } from "../../redux/user/operations";
import { useDispatch, useSelector } from "react-redux";
import { getWaterDaily } from "../../redux/waters/operations";
import { selectActiveDate } from "../../redux/waters/selectors";
import { useEffect } from "react";

const TrackerPage = () => {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDate);

  useEffect(() => {
    dispatch(getUserCurrent())
      .unwrap()
      .then(() => {
        dispatch(
          getWaterDaily({
            day: activeDay.day,
            month: activeDay.month,
            year: activeDay.year,
          })
        );
      });
  }, [dispatch, activeDay]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
