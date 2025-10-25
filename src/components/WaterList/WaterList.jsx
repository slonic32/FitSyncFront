import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { useSelector } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors';

export default function WaterList() {
  const dayWater = useSelector(selectDayWater);

  return (
    <>
      <ul className={css.waterListWrap}>
        {dayWater.length === 0 ? (
          <li className={css.card} key={1}></li>
        ) : (
          dayWater.map((item) => (
            <WaterItem
              key={item._id}
              myKey={item._id}
              countMl={item.value}
              currentTime={item.time}
            />
          ))
        )}
      </ul>
    </>
  );
}
