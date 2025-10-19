import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import css from './WaterForm.module.css';

const schema = yup.object().shape({
  activeHours: yup.number().required('Введіть кількість активних годин'),
  dailyWaterIntake: yup.number().required('Введіть денну норму води'),
});

export default function WaterForm({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const time = new Date();
  const onSubmit = (data) => {
    // Обробка даних форми
    console.log(data);
    closeModal(); // Close the modal
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formName}>
          <label className={css.labelRecord}>Recording time:</label>
          <input {...register('firstName', { value: time })} />
        </div>
        <p className={css.titleChoose}>Choose a value</p>

        <div className={css.formName}>
          <label className={css.labelEnter}>
            Enter the value of the water used:{' '}
          </label>

          <input {...register('lastName', { required: true, value: '50' })} />
          {errors.lastName && <p>Last name is required.</p>}
        </div>
        <button className={css.btnSave} type="submit">
          <span>Save</span>
        </button>
      </form>
    </>
  );
}
