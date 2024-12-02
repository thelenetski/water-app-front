import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addWater, patchWater } from "../../redux/waters/operations";
import { closeModal } from "../../redux/modal/slice";
import { toast } from "react-hot-toast";
import { modalTypes } from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import { selectLoading } from "../../redux/waters/selectors";
import Loader from "../Loader/Loader";
import css from "./WaterForm.module.css";
import { selectContentModal } from "../../redux/modal/selectors";

// Валідаційна схема
const schema = yup.object({
  date: yup
    .string()
    .required("Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  amount: yup
    .number()
    .required("Value is required")
    .min(50, "Minimum value is 50ml")
    .max(5000, "Maximum value is 5000ml")
    .typeError("Value must be a number"),
});

const WaterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const type = useSelector(selectTypeModal);
  const contentWaterModal = useSelector(selectContentModal);

 const handleSubmit = (values) => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];  
    const localTime = `${currentDateString}T${values.date}:00`; // Формуємо повний локальний час

    // Конвертуємо в ISO, враховуючи локальний час
    const isoDate = new Date(localTime).toISOString();
   const action =
     type === modalTypes.addWater
       ? addWater({ date: isoDate, amount: values.amount })
       : patchWater({
           id: contentWaterModal?._id,
           date: isoDate,
           amount: values.amount,
         });

   dispatch(action)
     .unwrap()
     .then(() => {
       toast.success(
         type === modalTypes.addWater
           ? "Water record added successfully!"
           : "Water record updated successfully!"
       );
       dispatch(closeModal());
     })
     .catch((error) => {
       console.error("Error:", error);
       toast.error(`Error: ${error.message}`);
     });
 };

  return loading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        date: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: contentWaterModal?.amount || 50,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.formWaterWrapper}>
          <p className={css.secWaterTitle}>
            {type === modalTypes.addWater
              ? "Choose a value:"
              : "Correct entered data:"}
          </p>

          <div className={css.counterWrapper}>
            <span className={css.amountWaterTitle}>Amount of water:</span>
            <div className={css.counterWaterWrapper}>
              <button
                type="button"
                onClick={() =>
                  setFieldValue("amount", Math.max(values.amount - 50, 50))
                }
                className={css.counterButton}
                disabled={values.amount <= 50}
              >
                <svg className={css.changeValueIcon}>
                  <use href="/sprite.svg#icon-minus"></use>
                </svg>
              </button>
              <span className={css.counterValue}>{values.amount} ml</span>
              <button
                type="button"
                onClick={() =>
                  setFieldValue("amount", Math.min(values.amount + 50, 5000))
                }
                className={css.counterButton}
                disabled={values.amount >= 5000}
              >
                <svg className={css.changeValueIcon}>
                  <use href="/sprite.svg#icon-plus"></use>
                </svg>
              </button>
            </div>
          </div>

          <div className={css.fieldsWaterWrapper}>
            <label className={css.timeLabel} htmlFor="date">
              Recording time:
              <ErrorMessage
                name="date"
                component="span"
                className={css.errorMessage}
              />
            </label>
            <Field className={css.input} type="time" id="date" name="date" />

            <label className={css.valueLabel} htmlFor="amount">
              Enter the value of the water used:
              <ErrorMessage
                name="amount"
                component="span"
                className={css.errorMessage}
              />
            </label>
            <Field
              className={css.input}
              type="number"
              id="amount"
              name="amount"
              min={50}
              max={5000}
            />
          </div>

          <button className={css.submitButton} type="submit" disabled={loading}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WaterForm;