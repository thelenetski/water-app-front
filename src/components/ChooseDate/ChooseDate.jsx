import css from "./ChooseDate.module.css";
import { useSelector } from "react-redux";
import { selectActiveDay } from "../../redux/waters/selectors.js";

const ChooseDate = () => {
  const currentDate = useSelector(selectActiveDay); 

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  const day = currentDate?.day;
  const date = `${currentDate?.day}.${currentDate?.month}.${currentDate?.year}`;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = currentDate !== null ? months[+currentDate?.month - 1] : "??";

  return (
    <>
      <h2 className={css.date}>
        {currentDate !== null &&
        date.toString().padStart(10, "0") === localDate()
          ? "Today"
          : `${day}, ${month}`}
      </h2>
    </>
  );
};

export default ChooseDate;

