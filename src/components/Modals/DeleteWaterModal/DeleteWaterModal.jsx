import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater, chooseMonth } from '../../../redux/water/operations';
import { showNotification } from '../../../utils/notification';
import css from './DeleteWaterModal.module.css';
import { selectMonth } from '../../../redux/water/selectors';

const title = 'Delete entry';

export default function DeleteWaterModal({ closeModal, entryId }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const month = useSelector(selectMonth);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Dispatch the deleteWater thunk

      await dispatch(deleteWater(entryId)).unwrap();

      // Show success notification
      showNotification('Water entry deleted successfully!', 'success');

      setTimeout(() => {
        dispatch(chooseMonth(month));
      }, 200);

      // Close modal after successful deletion
      closeModal();
    } catch (error) {
      // Show error notification
      showNotification(
        'Failed to delete water entry. Please try again.',
        'error'
      );

      console.error('Delete operation failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={css.modalBox}>
        <h2 className={css.title}>{title}</h2>
        <p>Are you sure you want to delete the entry?</p>

        <div className={css.btnBox}>
          <button
            className={css.btn}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>

          <button
            className={css.btnCancel}
            onClick={closeModal}
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
