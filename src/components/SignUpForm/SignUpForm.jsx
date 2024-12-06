import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./SignUpForm.module.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import sprite from "../../../public/sprite.svg";
import { selectAuthLoading } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import ToggleLang from "../ToggleLang/ToggleLang";
import { getUserCurrent } from "../../redux/user/operations";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const { t } = useTranslation();
  const validationParams = Yup.object().shape({
    email: Yup.string()
      .email(t("signUpForm.validation.email"))
      .required(t("signUpForm.validation.emailRequired")),
    password: Yup.string()
      .min(6, t("signUpForm.validation.minPassword"))
      .max(50, t("signUpForm.validation.maxPassword"))
      .matches(/^[A-Za-z\d]+$/, t("signUpForm.validation.matchesPassword"))
      .required(t("signUpForm.validation.requiredPassword")),
    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("signUpForm.validation.repeatPassword")
      )
      .required(t("signUpForm.validation.repeatRequiredPassword")),
  });

  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
  };

  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const handleSubmit = (values, actions) => {
    dispatch(
      signUp({
        email: values.email,
        password: values.password,
        repeatPassword: values.repeatPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(t("signUpForm.toastSuccess"));
        dispatch(getUserCurrent());
        actions.resetForm();
      })
      .catch((error) => {
        toast.error(t("signUpForm.toastFailed", { message: error.message }));
        actions.setSubmitting(false);
      });
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationParams}
      >
        {({
          values,
          setFieldValue,
          isValid,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className={css.form}>
            <h2 className={css.title}>{t("signUpForm.signupTitle")}</h2>
            <div className={css.logoWrapper}>
              <Logo />
            </div>
            <ToggleLang />
            <label>
              <span className={css.inputLabel}>
                {t("signUpForm.signupEmail")}
              </span>
              <Field
                className={clsx(css.field, {
                  [css.fieldError]: errors.email && touched.email,
                })}
                type="email"
                name="email"
                placeholder={t("signUpForm.signUpEmailField")}
                aria-label="Email"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </label>

            <label>
              <span className={css.inputLabel}>
                {t("signUpForm.signupPassword")}
              </span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]: errors.password && touched.password,
                  })}
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("signUpForm.signupPasswordField")}
                  aria-label="Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() =>
                    setFieldValue("showPassword", !values.showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${sprite}#icon-${
                        values.showPassword ? "eye" : "eye-off"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </label>

            <label>
              <span className={css.inputLabel}>
                {t("signUpForm.signupRepeatPassword")}
              </span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]:
                      errors.repeatPassword && touched.repeatPassword,
                  })}
                  type={values.showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  placeholder={t("signUpForm.signupRepeatPasswordField")}
                  aria-label="Repeat Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() =>
                    setFieldValue(
                      "showRepeatPassword",
                      !values.showRepeatPassword
                    )
                  }
                  aria-label="Toggle repeat password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${sprite}#icon-${
                        values.showRepeatPassword ? "eye" : "eye-off"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="repeatPassword"
                component="span"
              />
            </label>

            <button
              className={css.button}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {loading.signUp
                ? t("signUpForm.signupBtnLoading")
                : t("signUpForm.signupBtnSignup")}
            </button>
            <p className={css.signuptext}>
              <span>{t("signUpForm.signuptext")}</span>
              <Link to="/signin" className={css.signinlink}>
                {t("signUpForm.signupLink")}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
