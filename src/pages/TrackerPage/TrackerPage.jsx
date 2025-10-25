import { useDispatch, useSelector } from 'react-redux';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import { useEffect } from 'react';
import { chooseDay, chooseMonth } from '../../redux/water/operations';
import { selectDay, selectMonth } from '../../redux/water/selectors';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const day = useSelector(selectDay);
  const month = useSelector(selectMonth);

  useEffect(() => {
    dispatch(chooseDay(day));
  }, [dispatch, day]);

  useEffect(() => {
    dispatch(chooseMonth(month));
  }, [dispatch, month]);

  return (
    <>
      <main>
        <div className={css.wrapper}>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </div>
      </main>
    </>
  );
}
