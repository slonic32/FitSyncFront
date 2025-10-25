import css from './WaterProgressBar.module.css';
import sprite from '../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import { selectWaterLoading } from '../../redux/water/selectors';
import { selectDayWater } from '../../redux/water/selectors';
import { selectDay } from '../../redux/water/selectors';
import { DateToStr, DayToString } from '../../utils/dates';
import { selectUser } from '../../redux/auth/selectors';

export default function WaterProgressBar() {
  const dayWater = useSelector(selectDayWater);
  const dayNorma = useSelector(selectUser).dailyWaterNorm;

  const drinkedWater = dayWater.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.value;
  }, 0);
  let waterAmount = 0;

  if (drinkedWater) {
    if (dayNorma) {
      waterAmount = (drinkedWater * 100) / (dayNorma * 1000);
    } else {
      waterAmount = 100;
    }
  }

  const selectedDay = useSelector(selectDay);
  const isLoading = useSelector(selectWaterLoading);

  const now = new Date();
  const today = DayToString(now);

  return (
    <div className={css.progressBarContainer}>
      <div className={css.selectedDay}>
        {!isLoading ? (
          <div className={css.nameBar}>
            {' '}
            {selectedDay === today ? 'Today' : DateToStr(selectedDay)}
          </div>
        ) : (
          <div className={css.nameBar}>Today</div>
        )}
      </div>
      <div className={css.progressBar}>
        <div className={css.progress} style={{ width: `${waterAmount}%` }}>
          <svg
            className={css.circle}
            style={{ left: `${waterAmount}% ` }}
            fill="var(--accent)"
          >
            <use href={`${sprite}#icon-Ellipse-2`}></use>
          </svg>
        </div>
      </div>
      <div className={css.staticBar}>
        <span className={css.staticNumber}>0%</span>
        <span className={css.staticNumber}>50%</span>
        <span className={css.staticNumber}>100%</span>
      </div>
    </div>
  );
}
