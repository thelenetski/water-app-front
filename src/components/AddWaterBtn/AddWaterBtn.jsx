import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { openAddWater } from "../../redux/modal/slice";

const AddWaterBtn = ({ section }) => {
  const dispatch = useDispatch();

  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === "waterMain",
      [css.daily]: section === "daily",
    });

  return (
    <button
      onClick={() => dispatch(openAddWater())}
      type="button"
      className={classes(css.wrapper)}
    >
      <FaPlus className={classes(css.plusIcon)} />
      <p className={classes(css.text)}>Add water</p>
    </button>
  );
};

export default AddWaterBtn;
