import { useSelector } from "react-redux";
import { selectWatersDaily } from "../../redux/waters/selectors";
import { WaterItem } from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";

const WaterList = () => {
  const waterItems = useSelector(selectWatersDaily);

  return (
    <>
      {!waterItems?.length ? (
        <div
          className={css.noWater}
        >{`You haven\u2019t added the water yet.`}</div>
      ) : (
        <ul className={css.wrapper}>
          {waterItems.map((item) => (
            <li key={item?._id} className={css.item}>
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
