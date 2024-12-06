import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addWater, patchWater } from "../../redux/waters/operations";
import { closeModal } from "../../redux/modal/slice";
import { toast } from "react-hot-toast";
import { modalTypes } from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import { selectActiveDay, selectLoading } from "../../redux/waters/selectors";
import Loader from "../Loader/Loader";
import css from "./WaterForm.module.css";
import { selectContentModal } from "../../redux/modal/selectors";
import { useTranslation } from "react-i18next";

// Валідаційна схема
const WaterForm = () => {
  const { t } = useTranslation();
  const schema = yup.object({
    date: yup
      .string()
      .required(t("waterForm.validation.timeRequired"))
      .matches(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        t("waterForm.validation.invalidTimeFormat")
      ),
    amount: yup
      .number()
      .required(t("waterForm.validation.valueRequired"))
      .min(10, t("waterForm.validation.minValue"))
      .max(5000, t("waterForm.validation.maxValue"))
      .typeError(t("waterForm.validation.typeError")),
  });

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const type = useSelector(selectTypeModal);
  const contentWaterModal = useSelector(selectContentModal);
  const activeDay = useSelector(selectActiveDay);

  const time = new Date(
    contentWaterModal?.date || contentWaterModal?.createdAt
  ).toLocaleTimeString("ua-UA", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const handleSubmit = (values) => {
    const isoDate = new Date(
      `${activeDay.year}-${String(activeDay.month + 1).padStart(
        2,
        "0"
      )}-${String(activeDay.day).padStart(2, "0")}T${values.date}:00Z`
    ).toISOString();

    const action =
      type === modalTypes.addWater
        ? addWater({
            date: isoDate,
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
        toast.success(
          type === modalTypes.addWater
            ? t("waterForm.successAdd")
            : t("waterForm.successEdit")
        );
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(`${t("waterForm.error")}: ${error.message}`);
      });
  };

  return (
    <>
      {loading.main && <Loader />}
      {loading.main && <div className={css.loaderBackdrop}></div>}
      <Formik
        initialValues={{
          date: contentWaterModal?.date
            ? time
            : new Date().toLocaleTimeString("ua-UA", {
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
                ? t("waterForm.chooseValue")
                : t("waterForm.correctData")}
            </p>

            <div className={css.counterWrapper}>
              <span className={css.amountWaterTitle}>
                {t("waterForm.amountWater")}
              </span>
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
                {t("waterForm.recordingTime")}
                <ErrorMessage
                  name="date"
                  component="span"
                  className={css.errorMessage}
                />
              </label>
              <Field className={css.input} type="time" id="date" name="date" />

              <label className={css.valueLabel} htmlFor="amount">
                {t("waterForm.enterValue")}
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
              {t("waterForm.saveButton")}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WaterForm;
