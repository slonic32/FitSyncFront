import { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import css from './MonthInfo.module.css';

import { selectMonth } from '../../redux/water/selectors';
import { MonthToStr, dateFromStrMonth } from '../../utils/dates';
import { useSelector } from 'react-redux';

export default function MonthInfo() {
  const month = useSelector(selectMonth);

  const [selectedDate, setSelectedDate] = useState(dateFromStrMonth(month));

  return (
    <>
      <div className={css.wrapper}>
        <h3 className={css.month}>{MonthToStr(month)}</h3>
        <CalendarPagination
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Calendar selectedDate={selectedDate} />
    </>
  );
}
