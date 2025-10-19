import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IconPlus } from '../../Icons/IconPlus';
import { IconMinus } from '../../Icons/IconMinus';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  selectDayWater,
  selectDay,
  selectMonth,
} from '../../../redux/water/selectors';
import { addWater } from '../../../redux/water/operations';
import { editWater } from '../../../redux/water/operations';
import { chooseMonth } from '../../../redux/water/operations';

import css from './WaterModal.module.css';
const schema = yup.object().shape({
  value: yup.number().positive('Value must be positive'),
});
export default function WaterModal({ id, closeModal }) {
  const dispatch = useDispatch();
  const date = useSelector(selectDay);
  const month = useSelector(selectMonth);
  const waterValueDay = useSelector(selectDayWater);

  const currentWaterValue = id
    ? waterValueDay.find((item) => item._id === id)?.value || 50
    : 50;

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: getCurrentTime(),
      value: currentWaterValue,
      date: date,
    },
  });
  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0');
    return formattedTime;
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const submitForm = async (data) => {
    if (!id) {
      await dispatch(addWater(data));
    } else {
      await dispatch(editWater({ ...data, id }));
    }
    await dispatch(chooseMonth(month));
    closeModal(); // Close the modal
  };

  const decrement = () => {
    const currentValue = getValues('value');
    const value = currentValue - 50;
    if (value >= 0) {
      setValue('value', value);
    }
  };
  const increment = () => {
    const currentValue = getValues('value');
    const value = currentValue + 50;
    if (value <= 500) {
      setValue('value', value);
    }
  };
  return (
    <form className={css.waterForm} onSubmit={handleSubmit(submitForm)}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>
          {!id ? 'Add water' : 'Edit the entered amount of water'}
        </h2>
        <p className={css.waterTitle}>
          {!id ? 'Chouse a value' : 'Correct entered data:'}
        </p>
        <span className={css.waterAmount}>Amount of water:</span>
        <div className={css.wrapperAmount}>
          <button
            className={css.btnAmount}
            onClick={decrement}
            type="button"
            disabled={getValues('value') === 0}
          >
            <IconMinus className={css.icon} />
          </button>
          <span className={css.valueAmount}>{`${watch('value')} ml`}</span>
          <button className={css.btnAmount} onClick={increment} type="button">
            <IconPlus className={css.icon} />
          </button>
        </div>
        <div className={css.wrapperField}>
          <div>
            <label className={css.labelTime} htmlFor="time">
              Recording time:
            </label>
            <input
              {...register('time')}
              className={css.inputAmount}
              type="time"
              name="time"
              id="time"
            />
          </div>
          <label className={css.labelValue} htmlFor="value">
            Enter the value of the water used:
          </label>
          <input
            {...register('value')}
            className={css.inputAmount}
            type="number"
            name="value"
            id="value"
            onChange={(e) => setValue('value', Number(e.target.value))}
          />
          {errors.value && (
            <span className={css.error}>{errors.value.message}</span>
          )}
        </div>
        <button className={css.btnSubmit} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
