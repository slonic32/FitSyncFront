import AddWaterBtnBig from '../AddWaterBtnBig/AddWaterBtnBig';
import Logo from '../Logo/Logo';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';

export default function WaterMainInfo() {
  return (
    <>
      <div className={css.bottlePageWrapper}>
        <Logo />
        <div className={css.bottlePageNormWrap}>
          <WaterDailyNorma />
          <div className={css.progressBarCenter}>
            <WaterProgressBar />
          </div>
          <div className={css.progressBarRight}>
            <AddWaterBtnBig />
          </div>
        </div>
      </div>
    </>
  );
}
