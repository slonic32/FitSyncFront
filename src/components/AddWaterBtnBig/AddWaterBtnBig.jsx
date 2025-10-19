import css from './AddWaterBtnBig.module.css';

import AddWaterBtnBigBig from '../AddWaterBtnBigBig/AddWaterBtnBigBig';

export default function AddWaterBtnBig({ handleClick }) {
  return (
    <>
      <span className={css.conteiner}>
        <AddWaterBtnBigBig handleClick={handleClick} />
      </span>
    </>
  );
}
