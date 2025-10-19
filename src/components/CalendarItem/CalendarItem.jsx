import { useDispatch, useSelector } from 'react-redux';
import css from './CalendarItem.module.css';
import { selectMonth, selectMonthWater } from '../../redux/water/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { chooseDay } from '../../redux/water/operations';

export default function CalendarItem({ day, profit = 0 }) {
  const monthWater = useSelector(selectMonthWater);
  const month = useSelector(selectMonth);
  const dayNorma = useSelector(selectUser).dailyWaterNorm;

  profit = 0;

  const dispatch = useDispatch();

  if (monthWater[day]) {
    if (dayNorma) {
      profit = (monthWater[day] * 100) / (dayNorma * 1000);
    } else {
      profit = 100;
    }
  }

  const getButtonClass = (profit) => {
    return profit < 100 ? `${css.dayBtn} ${css.profitLow}` : css.dayBtn;
  };

  function handleClick() {
    if (day < 9) {
      dispatch(chooseDay('0' + day + '.' + month));
    } else {
      dispatch(chooseDay(day + '.' + month));
    }
  }

  return (
    <>
      <button className={getButtonClass(profit)} onClick={handleClick}>
        {day}
      </button>
      <span className={css.profit}>{profit.toFixed(0)} %</span>
    </>
  );
}
