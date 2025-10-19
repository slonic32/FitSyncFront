import { useState } from 'react';
import Modals from '../Modals/Modal/Modal';
import DeleteWaterModal from '../Modals/DeleteWaterModal/DeleteWaterModal';
import { AiOutlineDelete } from 'react-icons/ai';
import css from './AddDeleteBtn.module.css';

export default function AddDeleteBtn({ id }) {
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

  const handleBtn = (id) => {
    setUpdate(id);
    setModIsOpen(true);
  };

  const closeModalUpdate = () => {
    setModIsOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={() => handleBtn(id)} className={css.btn}>
        <AiOutlineDelete />
      </button>
        <Modals
          styleVariantBtn={styleNameClass.btnDelete}
          styleVariant={styleNameClass.modalDelete}
          isOpen={modIsOpen}
          closeModal={closeModalUpdate}
        >
          <div>
            <DeleteWaterModal closeModal={closeModalUpdate} entryId={update} />
          </div>
        </Modals>
    </div>
  );
}
