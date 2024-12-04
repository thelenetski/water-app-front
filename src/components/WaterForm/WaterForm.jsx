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
    .min(10, "Minimum value is 50ml")
    .max(5000, "Maximum value is 5000ml")
    .typeError("Value must be a number/ value in ml"),
});

const WaterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const type = useSelector(selectTypeModal);
  const contentWaterModal = useSelector(selectContentModal);

  const time = new Date(contentWaterModal?.createdAt).toLocaleTimeString(
    "ua-UA",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  ); // Поточна датаa

  const handleSubmit = (values) => {
    const isoDate = new Date(
      `${new Date().toISOString().split("T")[0]}T${values.date}:00Z`
    ).toISOString();

    const action =
      type === modalTypes.addWater
        ? addWater({
            date: new Date(
              `${new Date().toISOString().split("T")[0]}T${values.date}:00Z`
            ).toISOString(),
            amount: values.amount,
          })
        : patchWater({
            id: contentWaterModal?._id,
            date: isoDate,
            amount: values.amount,
          });

    dispatch(action)
      .unwrap()
      .then(() => {
        if (type === modalTypes.addWater) {
          toast.success("Water record added successfully!");
          dispatch(closeModal());
        } else if (type === modalTypes.editWater) {
          toast.success("Water record updated successfully!");
          dispatch(closeModal());
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <>
      {loading.main && <Loader />}
      {loading.main && <div className={css.loaderBackdrop}></div>}
      <Formik
        initialValues={{
          date: contentWaterModal?.date
            ? time // ISO 8601 -> гг:хвхв
            : new Date().toTimeString().slice(0, 5), // Поточний час
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
              <ErrorMessage
                name="date"
                component="span"
                className={css.errorMessage}
              />

              <label className={css.valueLabel} htmlFor="value">
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
              />
            </div>

            <button
              className={css.submitButton}
              type="submit"
              disabled={loading.main}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WaterForm;
