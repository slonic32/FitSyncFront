// import { AiOutlineDelete } from 'react-icons/ai';
// import { FiEdit2 } from 'react-icons/fi';
import css from './WaterItem.module.css';
import svg from '../../assets/sprite.svg';
import AddDeleteBtn from '../AddDeleteBtn/AddDeleteBtn';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

export default function WaterItem({
  myKey: id,
  countMl: ml,
  currentTime: time,
}) {
  return (
    <>
      <li className={css.card}>
        <svg className={css.glassIcon} width="38" height="38">
          <use xlinkHref={`${svg}#icon-glass`}></use>
        </svg>
        <div className={css.cardInfo}>
          <span className={css.amountWater}>{ml} ml</span>
          <span className={css.time}>{time}</span>
        </div>

        <div className={css.cardBtnsBlock}>
          <span className={css.btn}>
            <AddWaterBtn id={id} ml={ml} />
          </span>
          <span className={css.btn}>
            <AddDeleteBtn id={id} />
          </span>
        </div>
      </li>
    </>
  );
}
