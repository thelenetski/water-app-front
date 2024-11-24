import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './WaterForm.module.css';

// Валідаційна схема за допомогою yup
const schema = yup.object({
  date: yup
    .string()
    .required('Time is required')
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  value: yup
    .number()
    .required('Value is required')
    .min(10, 'Minimum value is 10ml')
    .max(2000, 'Maximum value is 2000ml')
    .typeError('Value must be in ml'),
});

export const WaterForm = ({ onSubmit }) => {
  // Налаштування react-hook-form із yup для валідації
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date().toTimeString().slice(0, 5), // Поточний час у форматі hh:mm
      value: 50, // Значення за замовчуванням
    },
  });

  // Обробка подання форми
  const handleFormSubmit = (data) => {
    onSubmit(data); // Передаємо дані на верхній рівень через пропс onSubmit
  };

  return (
    <form className={css.formWaterWrapper} onSubmit={handleSubmit(handleFormSubmit)}>
      <p>{subtitle}</p>
      <span>Amount of water:</span>
      <div>
        <button type="button"></button>
        <span></span>
        <button></button>
      </div>

      <div className={css.fieldsWaterWrapper}>
         <label className={css.timeLabel} htmlFor="date">
           Recording time:
           {errors.date && (
             <span className={css.errorMessage}>{errors.date.message}</span>
           )}
         </label>
         <input
           className={css.input}
           type="time"
           id="date"
           {...register("date")}
         />
         <label className={css.valueLabel} htmlFor="value">
           Enter the value of the water used:
           {errors.date && (
             <span className={css.errorMessage}>{errors.value.message}</span>
           )}
         </label>
         <input
           className={css.input}
           type="number"
           id="value"
           {...register("value")}
         />
        </div>

      <button className={css.submitButton} type="submit">
        Save
      </button>
    </form>
  );
};