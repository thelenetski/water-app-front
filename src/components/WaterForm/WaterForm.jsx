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

// Валідаційна схема
const schema = yup.object({
  date: yup
    .string()
    .required("Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  value: yup
    .number()
    .required("Value is required")
    .min(10, "Minimum value is 10ml")
    .max(5000, "Maximum value is 5000ml")
    .typeError("Value must be a number/ value in ml"),
});

const WaterForm = ({ data }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const type = useSelector(selectTypeModal);

  const handleSubmit = (values) => {
    if (
      type === modalTypes.editWater &&
      data?.value === values.value &&
      data?.date === values.date
    ) {
      toast.info("No changes detected.");
      return;
    }

    const action =
      type === modalTypes.addWater
        ? addWater({
            amount: values.value,
            date: new Date(
              `${new Date().toISOString().split("T")[0]}T${values.date}:00Z`
            ).toISOString(),
          })
        : patchWater({ id: data.id, ...values });

    dispatch(action)
      .unwrap()
      .then(() => {
        if (type === modalTypes.addWater) {
          toast.success("Water record added successfully!");
        } else if (type === modalTypes.editWater) {
          toast.success("Water record updated successfully!");
        }
        dispatch(closeModal());
      })
      .catch((error) => {
        console.log(values);
        console.error("Error:", error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        date: data?.date || new Date().toTimeString().slice(0, 5),
        value: data?.value || 50,
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
                  setFieldValue("value", Math.max(values.value - 10, 10))
                }
                className={css.counterButton}
                disabled={values.value <= 10}
              >
                <svg className={css.changeValueIcon}>
                  <use href="/sprite.svg#icon-minus"></use>
                </svg>
              </button>
              <span className={css.counterValue}>{values.value} ml</span>
              <button
                type="button"
                onClick={() =>
                  setFieldValue("value", Math.min(values.value + 10, 5000))
                }
                className={css.counterButton}
                disabled={values.value >= 5000}
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

            <label className={css.valueLabel} htmlFor="value">
              Enter the value of the water used:
              <ErrorMessage
                name="value"
                component="span"
                className={css.errorMessage}
              />
            </label>
            <Field
              className={css.input}
              type="number"
              id="value"
              name="value"
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
