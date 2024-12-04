import { useSelector } from "react-redux";
import css from "./WaterMainInfo.module.css";
import {
  selectActiveDay,
  selectWatersDaily,
} from "../../redux/waters/selectors";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { selectUser } from "../../redux/user/selectors";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import Logo from "../Logo/Logo";

export default function WaterMainInfo() {
  const user = useSelector(selectUser);

  const dailyWaterArray = useSelector(selectWatersDaily);

  const [percentValue, setPercentValue] = useState(0);

  const [isVisiblePercent, setIsVisiblePercent] = useState(false);

  const [drankPerDay, setDrankPerDay] = useState(0);

  const currentDate = useSelector(selectActiveDay);

  const dailyNorm = user !== null ? user.data.dailyNorm : 1500;
  const dailyNormLiter = dailyNorm / 1000;

  const localDate = () => {
    const milliseconds = Date.now();
    const date = new Date(milliseconds);
    return date.toLocaleDateString().replace(/\//g, ".");
  };

  const day = currentDate?.day;
  const date = `${currentDate?.day}.${currentDate?.month + 1}.${
    currentDate?.year
  }`;

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

  const month = currentDate !== null ? months[+currentDate?.month] : "??";

  //victor change
  const amountDrankWater =
    dailyWaterArray.length > 0 &&
    dailyWaterArray.reduce((previousValue, glass) => {
      return previousValue + (glass?.amount || 0);
    }, 0);

  useEffect(() => {
    setDrankPerDay(amountDrankWater);
    setPercentValue(Math.round((drankPerDay * 100) / dailyNorm));

    if (drankPerDay > dailyNorm) {
      setIsVisiblePercent(false);

      setPercentValue(100);
    }

    if (percentValue === 0 || percentValue >= 100) {
      setIsVisiblePercent(true);
    } else {
      setIsVisiblePercent(false);
    }
  }, [dailyNorm, drankPerDay, percentValue, amountDrankWater]);

  return (
    <>
      <div className={css.main}>
        <Logo />
        <picture className={css.picture}>
          <source
            media="(min-width:1440px)"
            srcSet="
              /WaterMainInfo_photos/transparent_bottle_pc_x1.webp 1x,
              /WaterMainInfo_photos/transparent_bottle_pc_x2.webp 2x
            "
          />
          <source
            media="(min-width:768px)"
            srcSet="
              /WaterMainInfo_photos/transparent_bottle_tablet_x1.webp 1x,
              /WaterMainInfo_photos/transparent_bottle_tablet_x2.webp 2x
            "
          />
          <source
            media="(max-width:767px)"
            srcSet="
              /WaterMainInfo_photos/transparent_bottle_mobile_x1.webp 1x,
              /WaterMainInfo_photos/transparent_bottle_mobile_x2.webp 2x
            "
          />
          <img
            src="/WaterMainInfo_photos/transparent_bottle_mobile_x1.webp"
            alt="bottle photo"
          />
        </picture>
        <div className={css.dailyNorma}>
          <p className={css.p1}>{dailyNormLiter}L</p>
          <p className={css.p2}>My daily norma</p>
        </div>
        <div className={css.progressBar}>
          <p className={css.pToday}>
            {currentDate !== null &&
            date.toString().padStart(10, "0") === localDate()
              ? "Today"
              : `${day}, ${month}`}
          </p>
          <div className={css.barMain}>
            <div className={css.barBg}>
              <div
                className={css.barProgress}
                style={{ left: `-${100 - percentValue}%` }}
              ></div>
            </div>
            <div
              className={clsx(css.barCircle)}
              style={{ left: `${percentValue}%` }}
            ></div>
            <div
              className={clsx(
                css.barPercent,
                isVisiblePercent && css.hiddenCircle
              )}
              style={{
                left: `${percentValue}%`,
              }}
            >
              {percentValue}%
            </div>
            <div className={css.staticPercent}>
              <p className={css.percent_0}>0%</p>
              <p className={css.percent_50}>50%</p>
              <p className={css.percent_100}>100%</p>
            </div>
          </div>
        </div>
        <div className={css.buttonWaterMain}>
          <AddWaterBtn section="waterMain" />
        </div>
      </div>
    </>
  );
}
