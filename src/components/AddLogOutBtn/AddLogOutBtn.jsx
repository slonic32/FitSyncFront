import { useState } from 'react';
import Modals from '../Modals/Modal/Modal';
import { FiLogOut } from 'react-icons/fi';
import LogOutModal from '../Modals/LogOutModal/LogOutModal';
import css from './AddLogOutBtn.module.css';

export default function AddLogOutBtn() {
  const [update, setUpdate] = useState(null);
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
    setUpdate(1);
    setModIsOpen(true);
  };

  const closeModalUpdate = () => {
    setModIsOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={() => handleBtn()} className={css.btn}>
        <FiLogOut /> Log out
      </button>
        <Modals
          styleVariantBtn={styleNameClass.btnDelete}
          styleVariant={styleNameClass.modalDelete}
          isOpen={modIsOpen}
          closeModal={closeModalUpdate}
        >
          <div>
            <LogOutModal closeModal={closeModalUpdate} entryId={update} />
          </div>
        </Modals>
    </div>
  );
}
