import { useState } from "react";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import Calendar from "../Calendar/Calendar";
import css from "./MonthInfo.module.css";

import { selectMonth, selectMonthWater } from "../../redux/water/selectors";
import { MonthToStr, dateFromStrMonth } from "../../utils/dates";
import { useSelector } from "react-redux";
import WaterChart from "../WaterChart/WaterChart";
import { selectDaylyNorm } from "../../redux/auth/selectors";

export default function MonthInfo() {
  const month = useSelector(selectMonth);

  const [selectedDate, setSelectedDate] = useState(dateFromStrMonth(month));

  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <div className={css.wrapper}>
        <h3 className={css.month}>{MonthToStr(month)}</h3>
        <CalendarPagination
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      {!showChart && <Calendar selectedDate={selectedDate} />}
      {showChart && <WaterChart selectedDate={selectedDate} />}
    </>
  );
}
