import { useState } from "react";
import Modals from "../Modals/Modal/Modal";

import css from "./WaterChartButton.module.css";
import svg from "../../assets/sprite.svg";
import WaterChart from "../WaterChart/WaterChart";

export default function WaterChartButton() {
  const [update, setUpdate] = useState(null);
  const [modIsOpen, setModIsOpen] = useState(false);
  const styleNameClass = {
    modalDelete: "modalDelete",
    btnDelete: "btnDelete",
    modalSetting: "modalSetting",
    btnSetting: "btnSetting",
    modalWater: "Modal",
    btnWater: "btnWater",
  };

  const handleBtn = id => {
    setUpdate(id);
    setModIsOpen(true);
  };

  const closeModalUpdate = () => {
    setModIsOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={() => handleBtn()} className={css.btn}>
        <svg width="20" height="20" className={css.pieIcon}>
          <use xlinkHref={`${svg}#icon-pie-chart`}></use>
        </svg>
      </button>

      <Modals
        styleVariantBtn={styleNameClass.btnDelete}
        styleVariant={styleNameClass.modalDelete}
        isOpen={modIsOpen}
        closeModal={closeModalUpdate}
      >
        <div>
          <WaterChart />
        </div>
      </Modals>
    </div>
  );
}
