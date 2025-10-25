import { useState } from 'react';
import Modals from '../Modals/Modal/Modal';
import WaterModal from '../Modals/WaterModal/WaterModal';
import css from './AddWaterBtnBigBig.module.css';
import { FaPlus } from 'react-icons/fa';
export default function AddWaterBtnBigBig() {
  const [modIsOpen, setModIsOpen] = useState(false);
  const styleNameClass = {
    modalDelete: 'modalDelete',
    btnDelete: 'btnDelete',
    modalSetting: 'modalSetting',
    btnSetting: 'btnSetting',
    modalWater: 'Modal',
    btnWater: 'btnWater',
  };
  const handleBtn = () => {
    // handleClick();
    setModIsOpen(true);
  };
  const closeModalUpdate = () => {
    setModIsOpen(false);
  };
  return (
    <div>
      <button
        className={css.container}
        type="button"
        onClick={() => handleBtn()}
      >
        <FaPlus />
        Add water
      </button>
      <Modals
        styleVariantBtn={styleNameClass.btnWater}
        styleVariant={styleNameClass.modalWater}
        isOpen={modIsOpen}
        closeModal={closeModalUpdate}
      >
        <div>
          <WaterModal closeModal={closeModalUpdate} />
        </div>
      </Modals>
    </div>
  );
}
