import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveDay,
  selectLoading,
  selectWatersDaily,
} from "../../redux/waters/selectors";
import { WaterItem } from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { useEffect } from "react";
import { getWaterDaily } from "../../redux/waters/operations";

const WaterList = () => {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const waterItems = useSelector(selectWatersDaily);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(
      getWaterDaily({
        day: activeDay.day,
        month: activeDay.month,
        year: activeDay.year,
      })
    );
  }, [dispatch, activeDay]);

  return (
    <>
      {loading.daily ? (
        <div className={css.noWater}>Loading...</div>
      ) : !waterItems?.length ? (
        <div className={css.noWater}>You haven’t added the water yet.</div>
      ) : (
        !loading.daily && (
          <ul className={css.wrapper}>
            {waterItems.map((item) => (
              <li key={item?._id} className={css.item}>
                <WaterItem item={item} />
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default WaterList;
