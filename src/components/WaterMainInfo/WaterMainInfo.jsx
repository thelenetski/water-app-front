import { useDispatch, useSelector } from "react-redux";
import css from "./WaterMainInfo.module.css";
import { selectWatersDaily } from "../../redux/waters/selectors";
import { openAddWater } from "../../redux/modal/slice";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { selectUser } from "../../redux/user/selectors";

export default function WaterMainInfo() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [percentValue, setPercentValue] = useState(0);
  const [isVisiblePercent, setIsVisiblePercent] = useState(true);
  const [isVisibleCircle, setIsVisibleCircle] = useState(true);

  const dailyNorm = 1500; //user.dailyNorm;
  const dailyNormLiter = dailyNorm / 1000;
  const dailyArray = useSelector(selectWatersDaily);
  const drankPerDay = 1500; //dailyArray.map(); //Дописать цикл

  useEffect(() => {
    setPercentValue(Math.round((drankPerDay * 100) / dailyNorm));

    if (drankPerDay > dailyNorm) {
      setIsVisiblePercent(true);
    }
    if (percentValue === 0 || percentValue > 95) {
      setIsVisibleCircle(false);
    }
  }, [drankPerDay, dailyNorm, percentValue]);

  function handleOnClick() {
    dispatch(openAddWater);
  }

  return (
    <div className={clsx(css.container, "container")}>
      <div className={css.main}>
        <h2 className={css.h2}>AQUATRACK</h2>
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
          <p className={css.pToday}>Today</p>
          <div className={css.barMain}>
            <div className={css.barBg}>
              <div
                className={css.barProgress}
                style={{ left: `-${100 - percentValue}%` }}
              ></div>
            </div>
            <div
              className={clsx(
                css.barCircle,
                isVisibleCircle && css.hiddenCircle
              )}
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
        <button className={css.button} type="button" onClick={handleOnClick}>
          <svg>
            className={css.buttonSvg}
            <use href="/sprite.svg#icon-x"></use>
          </svg>
          Add water
        </button>
      </div>
    </div>
  );
}
