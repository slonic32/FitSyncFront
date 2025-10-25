import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import { selectDay } from '../../redux/water/selectors';
import { DateToStr, DayToString } from '../../utils/dates';

export default function ChooseDate() {
  const now = new Date();
  const day = useSelector(selectDay);

  const today = DayToString(now);
  return (
    <>
      <p className={css.date}>{day === today ? 'Today' : DateToStr(day)}</p>
    </>
  );
}
