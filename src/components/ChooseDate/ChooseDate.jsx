import css from "./ChooseDate.module.css";
import { useSelector } from "react-redux";

const ChooseDate = () => {
  const currentDate = useSelector(); //"нужно передать в useSelector() из state активную дату "

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  let day = currentDate.replace(/\//g, ".").split(".")[0];

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

  const month = months[+currentDate.split("/")[1] - 1];
  const monthDot = months[+currentDate.split(".")[1] - 1];

  return (
    <>
      <h2 className={css.date}>
        {currentDate.replace(/\//g, ".") === localDate()
          ? "Today"
          : `${day}, ${month || monthDot}`}
      </h2>
    </>
  );
};

export default ChooseDate;
