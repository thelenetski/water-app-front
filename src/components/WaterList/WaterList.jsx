import { useSelector } from 'react-redux';
import { selectWatersMonthly } from '../../redux/waters/selectors';
import { WaterItem } from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

export function WaterList () {
  const waterItems = useSelector(selectWatersMonthly);

  return (
    <>
      {!waterItems?.length ? (
        <div className={css.noWater}>You haven&apost added the water yet.</div>
      ) : (
        <ul className={css.wrapper}>
          {waterItems.map((item) => (
            <li key={item._id} className={css.item}>
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};