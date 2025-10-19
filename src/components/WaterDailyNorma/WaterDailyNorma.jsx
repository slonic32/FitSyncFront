import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors';
export default function WaterDailyNorma() {
  const daylyNorm = useSelector(selectUser).dailyWaterNorm;

  return (
    <>
      <div className={css.container}>
        <p>{daylyNorm ? `${daylyNorm}L` : '0L'}</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
}
