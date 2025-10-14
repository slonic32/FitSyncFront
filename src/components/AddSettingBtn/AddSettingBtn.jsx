import { useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import Modal from '../Modals/Modal/Modal';
import UserSettingsModal from '../Modals/UserSettingsModal/UserSettingsModal';
import css from './AddSettingBtn.module.css';

export default function AddSettingBtn() {
  const [modIsOpen, setModIsOpen] = useState(false);
  const styleNameClass = {
    modalDelete: 'modalDelete',
    btnDelete: 'btnDelete',
    modalSetting: 'modalSetting',
    btnSetting: 'btnSetting',
    modalWater: 'Modal',
    btnWater: 'btnWater',
  };

  const handleAddWater = () => {
    document.body.style.overflow = 'hidden';
    setModIsOpen(true);
  };

  const closeModalUpdate = () => {
    document.body.removeAttribute('style');
    setModIsOpen(false);
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleAddWater()}
        className={css.btn}
      >
        {' '}
        <CiSettings />
        Setting
      </button>
      <Modal
        styleVariantBtn={styleNameClass.btnSetting}
        styleVariant={styleNameClass.modalSetting}
        isOpen={modIsOpen}
        closeModal={closeModalUpdate}
      >
        <div>
          <UserSettingsModal
            closeModal={closeModalUpdate}
            modIsOpen={modIsOpen}
          />
        </div>
      </Modal>
    </div>
  );
}
