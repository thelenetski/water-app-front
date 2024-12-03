import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { getUserCurrent } from "../../redux/user/operations";
import { useDispatch, useSelector } from "react-redux";
import { getWaterDaily } from "../../redux/waters/operations";
import {selectActiveDate} from "../../redux/waters/selectors";
import { useEffect } from "react";

const TrackerPage = () => {
  const dispatch = useDispatch();
  const activeDate = useSelector(selectActiveDate);

  useEffect(() => {
    dispatch(getUserCurrent())
      .unwrap()
      .then(() => {
        dispatch(
          getWaterDaily({
            day: activeDate.day,
            month: activeDate.month,
            year: activeDate.year,
          })
        );
      });
  }, [dispatch, activeDate]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
